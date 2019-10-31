import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchCountComponent } from './search-count/search-count.component';
import { SearchResultComponent } from './search-result/search-result.component';



@NgModule({
  declarations: [SearchComponent, SearchCountComponent, SearchResultComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SearchModule { }
