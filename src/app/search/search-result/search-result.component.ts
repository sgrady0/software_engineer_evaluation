import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SearchResultItem } from '../../core/services/search/search-results.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent implements OnChanges {
  @Input()
  item: SearchResultItem;

  itemThumbnail?: string;
  itemTitle?: string;
  itemDate?: string;

  ngOnChanges(changes: SimpleChanges): void {
    const { item } = this;

    if (item != null) {
      this.itemThumbnail = item.links[0].href;
      this.itemTitle = item.data['0'].title;
      this.itemDate = item.data['0'].date_created;
    }
  }
}
