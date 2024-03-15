export const bodyConvertFormData = ({
  items,
  files,
}: {
  items: {[key: string]: object | string | number | boolean | null};
  files?: {key: string; value: Blob}[];
}) => {
  const formdata = new FormData();

  Object.entries(items).forEach(([key, value]) => {
    formdata.append(key, JSON.stringify(value));
  });

  if (files) {
    files.forEach((file) => {
      formdata.append(file.key, file.value);
    });
  }

  return formdata;
};
