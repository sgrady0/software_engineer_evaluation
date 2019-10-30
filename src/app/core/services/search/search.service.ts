import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchResults } from './search-results.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<SearchResults> {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://images-api.nasa.gov/search?media_type=image&q=${encodedQuery}`;
    return this.http.get<SearchResults>(url);
  }
}
