export type WikipediaRequestTypes = {
  search: {
    params: {
      query: string;
    };
    response: WikipediaSearchPageResult;
    types: {
      WikipediaSearchPageResultItem: WikipediaSearchPageResultItem;
    };
  };
};

type WikipediaSearchPageResult = {
  batchcomplete: boolean;
  continue: {
    gpsoffset: number;
    continue: string;
  };
  query: {
    pages: WikipediaSearchPageResultItem[];
  };
};

type WikipediaSearchPageResultItem = {
  pageid: number;
  ns: number;
  title: string;
  index: number;
  thumbnail: {
    source: string;
    width: number;
    height: number;
  };
  pageimage: string;
};
