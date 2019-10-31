import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SearchResultsCollection } from '../../core/services/search/search-results.interface';

@Component({
  selector: 'app-search-count',
  templateUrl: './search-count.component.html',
  styleUrls: ['./search-count.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCountComponent {
  @Input()
  searchResults: SearchResultsCollection;
}
