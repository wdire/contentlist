import {ZodError, ZodType} from "zod";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {AxiosError} from "axios";

import {CreateResponse} from "./response.api";
import {getUrlParams} from "./util.api";

export type RequestParams = {params: {[key: string]: string}};

type BodyAndParams<B, P> = {body: B; params: P};

export const withValidation = async <B = null, P = null>(
  {
    _request,
    _params,
    paramsUrl,
    bodySchema,
    paramsSchema,
  }: {
    _request?: Request;
    _params?: RequestParams; // next.js params like /get/123
    paramsUrl?: string; // params like /search?query=abc&lang=en
    bodySchema?: ZodType;
    paramsSchema?: ZodType;
  },
  handler: (props: BodyAndParams<B, P>) => Promise<Response>,
) => {
  try {
    const props: BodyAndParams<B, P> = {
      body: null as B,
      params: null as P,
    };

    if (bodySchema) {
      if (!_request?.body) {
        return CreateResponse({status: 500, message: "Couldn't recieve request for validation"});
      }
      props.body = await bodySchema.parse(await _request.json());
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
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return CreateResponse({status: 404, error: "Record to delete does not exist."});
        }
        return CreateResponse({status: 406, error});
      }
      if (error instanceof AxiosError) {
        return CreateResponse({status: 406, error: error?.message});
      }
      return CreateResponse({status: 500});
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return CreateResponse({status: 406, error: error.issues});
    }

    return CreateResponse({status: 406, error: "Error occured on validation"});
  }
};
