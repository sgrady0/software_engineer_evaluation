import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalComponent } from './modal.component';

@NgModule({
  entryComponents: [ModalComponent],
  declarations: [ModalComponent],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
