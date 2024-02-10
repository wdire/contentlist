export enum ResponseCodes {
  Ok = 200,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  NotAcceptable = 406,
  InternalServerError = 500,
}

export const ResponseMessages: {[key in ResponseCodes]: string} = {
  200: "OK",
  202: "Accepted",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  406: "Not Acceptable",
  500: "Internal Server Error",
} as const;

export type ResponseBodyType<D = unknown> = {
  status: ResponseCodes;
  data?: D;
  error?: unknown;
  message?: string;
};

export const CreateResponse = <D = unknown>({
  status,
  data,
  error,
  message,
}: ResponseBodyType<D>) => {
  const response: ResponseBodyType<D> = {
    status,
    message: ResponseMessages[status],
  };

  if (error || error === null) {
    response.error = error;
  }

  if (data || data === null) {
    response.data = data;
  }

  if (message) {
    response.message = message;
  }

  if (status === 204) {
    return new Response(null, {
      status,
      statusText: ResponseMessages[status] || "",
    });
  }

  return Response.json(response, {
    status,
    statusText: ResponseMessages[status] || "",
  });
};
