export interface SearchResults {
  collection: SearchResultsCollection;
}

export interface SearchResultsCollection {
  version: string;
  href: string;
  metadata: SearchResultMetadata;
  items: SearchResultItem[] | [];
  links?: SearchResultLink[];
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
  data: [SearchResultItemData];
}

export interface SearchResultItemLink {
  render: 'image';
  href: string;
  rel: string;
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

export interface SearchResultImageCollection {
  orig: string;
  large: string;
  medium: string;
  small: string;
  thumb: string;
  metadata: string;
}
