export interface SearchResults {
  collection: {
    version: string,
    href: string
    metadata: SearchResultMetadata
    items: SearchResultItem[] | []
    links?: SearchResultLink[]
  };
}

export interface SearchResultLink {
  rel: string;
  href: string;
  prompt: string;
}

export interface SearchResultMetadata {
  total_hits: number;
}

export interface SearchResultItem {
  href: string;
  links: SearchResultLink[];
  data: SearchResultItemData;
}

export interface SearchResultItemData {
  title: string;
  description_508: string;
  date_created: string;
  description: string;
  secondary_creator: string;
  media_type: string;
  keywords: string[];
  nasa_id: string;
  center: string;
}
