import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionResponse } from '../core/services/session/session-response.interface';
import { SessionService } from '../core/services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements AfterViewInit {
  readonly credentials = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  @ViewChild('usernameControl', { static: true })
  usernameControl: ElementRef;

  isSubmitting = false;
  errorMessage = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
    private session: SessionService
  ) {}

  ngAfterViewInit(): void {
    this.usernameControl.nativeElement.focus();
  }

  submit(): void {
    const { credentials } = this;

    if (this.isSubmitting) { return; }
    if (credentials.invalid) {
      // Expose validation error styling on the template
      this.credentials.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.isSubmitting = true;
    this.cdr.markForCheck();

    this.session.authenticate(credentials.value).subscribe({
      next: this.handleLoginSuccess.bind(this),
      error: this.handleLoginError.bind(this)
    });
  }

  private handleLoginSuccess(): void {
    this.router.navigateByUrl('/');
  }

  private handleLoginError({ message }: SessionResponse): void {
    this.credentials.reset();
    this.errorMessage = message; // TODO: Display error message once a user story is written and visual design is created.
    this.isSubmitting = false;
    this.cdr.markForCheck();

    // Fails to focus if part of current execution queue
    setTimeout(() => this.usernameControl.nativeElement.focus());
  }
}
