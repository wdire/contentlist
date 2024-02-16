export type Middleware = (next: () => void) => Promise<Response | void>;

export const withMiddlewares = async ({
  middlewares,
  handler,
}: {
  middlewares: Middleware[];
  handler: () => Promise<Response>;
}): Promise<Response> => {
  let result;

  for (let i = 0; i < middlewares.length; i += 1) {
    let nextInvoked = false;

    const next = async () => {
      nextInvoked = true;
    };

    result = await middlewares[i](next);

    if (!nextInvoked) {
      break;
    }
  }

  if (result) {
    return result;
  }

  return handler();
};
