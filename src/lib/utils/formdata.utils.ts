export const bodyConvertFormData = ({
  body,
  files,
}: {
  body: object;
  files?: {key: string; value: Blob}[];
}) => {
  const formdata = new FormData();

  formdata.append("body", JSON.stringify(body));

  if (files) {
    files.forEach((file) => {
      formdata.append(file.key, file.value);
    });
  }

  return formdata;
};
