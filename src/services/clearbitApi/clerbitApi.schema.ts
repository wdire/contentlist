export type ClearbitRequestTypes = {
  autocomplete: {
    params: {
      query: string;
    };
    response: ClearbitAutocompleteResultItem[];
    types: {
      ClearbitAutocompleteResultItem: ClearbitAutocompleteResultItem;
    };
  };
};

type ClearbitAutocompleteResultItem = {
  domain: string;
  logo: string;
  name: string;
};
