import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {
  @Input()
  src: SafeUrl;

  @Output()
  closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }
}
