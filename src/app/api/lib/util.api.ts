export const getUrlParams = (fullUrl: string) => {
  const url = new URL(fullUrl);
  const paramsObj: {[key: string]: string} = {};

  Array.from(url.searchParams.entries()).forEach(([key, value]) => {
    paramsObj[key] = value;
  });

  return paramsObj;
};
