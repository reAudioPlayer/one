export const SCOPES = ["local", "spotify"] as const;
export const TYPES = ["song", "artist", "album", "playlist"] as const;

type SearchScope = (typeof SCOPES)[number];
type SearchType = (typeof TYPES)[number];

export interface ISearchResultItem {
    confidence: number;
    scope: SearchScope;
    type: SearchType;
    item: any;
}

export interface ISearchResponse {
    query: string;
    scope: (SearchScope | SearchType)[];
    items: ISearchResultItem[];
}
