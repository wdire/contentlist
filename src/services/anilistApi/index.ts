import {api as generatedApi} from "./anilist.generated";

export const anilistApi = generatedApi.enhanceEndpoints({
  endpoints: {
    GetMediaList: {},
  },
});

export const {
  GetCharacterList: {initiate: AnilistGetCharacterListInitiate},
  GetMediaList: {initiate: AnilistGetMediaListInitiate},
} = anilistApi.endpoints;
