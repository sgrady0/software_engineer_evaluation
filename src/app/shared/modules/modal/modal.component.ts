import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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

  @HostListener('body:keydown', ['$event'])
  onEsc(event: KeyboardEvent) {
    if (event.key !== 'Escape') { return; }
    event.preventDefault();
    this.close();
  }

  close(): void {
    this.closeModal.emit();
  }
}
