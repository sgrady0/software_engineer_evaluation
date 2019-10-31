import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchQuery } from './search-query.interface';
import { SearchResultImageCollection, SearchResultItem, SearchResults, SearchResultsCollection } from './search-results.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search({ query, limit = 1 }: SearchQuery): Observable<SearchResultsCollection> {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://images-api.nasa.gov/search?media_type=image&q=${encodedQuery}`;
    return this.http.get<SearchResults>(url).pipe(
      map(results => {
        const { length } = results.collection.items;
        if (length > limit) { results.collection.items.length = limit; }
        return results.collection;
      })
    );
  }

  imageCollection({ href }: SearchResultItem): Observable<SearchResultImageCollection> {
    return this.http.get<imageCollection>(href).pipe(map(
      ([orig, large, medium, small, thumb, metadata]) => ({
        orig, large, medium, small, thumb, metadata
      })
    ));
  }
}

type imageCollection = [
  string,
  string,
  string,
  string,
  string,
  string
];
