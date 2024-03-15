import {ZodError, ZodType} from "zod";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {AxiosError} from "axios";

import {CreateResponse} from "./response.api";
import {getUrlParams} from "./utils/main.util.api";

export type RequestParams = {params: {[key: string]: string}};

type BodyAndParams<B, P> = {body: B; params: P};

export const withValidation = async <B = null, P = null>(
  {
    _request,
    _params,
    paramsUrl,
    bodySchema,
    paramsSchema,
    formdataSchema,
  }: {
    _request?: Request;
    _params?: RequestParams; // next.js params like /get/123
    paramsUrl?: string; // params like /search?query=abc&lang=en
    bodySchema?: ZodType;
    paramsSchema?: ZodType;
    formdataSchema?: ZodType;
  },
  handler: (props: BodyAndParams<B, P>) => Promise<Response>,
) => {
  try {
    const props: BodyAndParams<B, P> = {
      body: null as B,
      params: null as P,
    };

    if (bodySchema || formdataSchema) {
      if (!_request?.body) {
        return CreateResponse({status: 500, message: "Couldn't recieve request for validation"});
      }

      if (formdataSchema) {
        const receivedFormdata = await _request.formData();
        const formdataObject: {[key: string]: unknown} = {};

        Array.from(receivedFormdata.entries()).forEach(([key, value]) => {
          if (typeof value === "string") {
            try {
              formdataObject[key] = JSON.parse(value);
            } catch (error) {
              formdataObject[key] = value;
            }
          } else {
            formdataObject[key] = value;
          }
        });

        props.body = await formdataSchema.parse(formdataObject);
      } else if (bodySchema) {
        props.body = await bodySchema.parse(await _request.json());
      }
    }

    if (paramsSchema) {
      if (_params?.params) {
        props.params = await paramsSchema.parse(_params?.params);
      } else if (paramsUrl) {
        props.params = await paramsSchema.parse(getUrlParams(paramsUrl));
      } else {
        return CreateResponse({status: 500, message: "Couldn't recieve params for validation"});
      }
    } else if (_params?.params || paramsUrl) {
      return CreateResponse({status: 500, message: "Couldn't recieve params for validation"});
    }

    try {
      return await handler(props);
    } catch (error) {
      console.error("Route handler error", error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return CreateResponse({status: 404, error: "Missing record to perform the action."});
        }
        return CreateResponse({status: 406, error});
      }
      if (error instanceof AxiosError) {
        return CreateResponse({status: 406, error: error?.message});
      }

      console.error("Unknown route handler error", error);
      return CreateResponse({status: 500});
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return CreateResponse({status: 406, error: error.issues});
    }

    if (error instanceof SyntaxError) {
      // Json error
      return CreateResponse({status: 406, error: "Request body must be non-empty json object"});
    }

    console.error("Unknown validation error", error);

    return CreateResponse({status: 406, error: "Error occured on validation"});
  }
};
