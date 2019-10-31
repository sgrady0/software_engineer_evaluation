import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalModule } from '../shared/modules/modal/modal.module';
import { SearchCountComponent } from './search-count/search-count.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchComponent, SearchCountComponent, SearchResultComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ModalModule
  ]
})
export class SearchModule { }
