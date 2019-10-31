import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  SecurityContext
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';

import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly isOpen = new BehaviorSubject<boolean>(false);
  readonly isOpen$ = this.isOpen.asObservable().pipe(
    distinctUntilChanged()
  );

  private currentModalRef: ComponentRef<ModalComponent>;

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private sanitizer: DomSanitizer
  ) {}

  openOverlay(src?: string): void {
    if (this.isOpen.getValue()) { return; }

    this.attachModal();
    if (src) { this.populate(src); }
  }

  populate(src: string): void {
    this.currentModalRef.instance.src = this.sanitizer.sanitize(SecurityContext.URL, src);
  }

  close(): void {
    this.destroyModal();
  }

  private attachModal(): void {
    this.isOpen.next(true);

    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(ModalComponent)
      .create(this.injector);

    (window as any).x = componentRef.instance.closeModal
      .pipe(take(1))
      .subscribe(this.close.bind(this));

    this.appRef.attachView(componentRef.hostView);

    // From: https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
    this.currentModalRef = componentRef;
  }

  private destroyModal() {
    this.isOpen.next(false);
    this.currentModalRef.destroy();
  }
}
