import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../shared/modules/modal/modal.module';
import { SearchComponent } from './search.component';
import { SearchCountComponent } from './search-count/search-count.component';
import { SearchResultComponent } from './search-result/search-result.component';



@NgModule({
  declarations: [SearchComponent, SearchCountComponent, SearchResultComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule
  ]
})
export class SearchModule { }
