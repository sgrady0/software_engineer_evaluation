import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Subject } from 'rxjs';
import { distinctUntilKeyChanged, map, shareReplay, tap } from 'rxjs/operators';

import { SearchResultsCollection } from '../core/services/search/search-results.interface';
import { SearchService } from '../core/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly searchResults = new Subject<SearchResultsCollection>();
  readonly searchResults$ = this.searchResults.asObservable().pipe(
    distinctUntilKeyChanged('href'),
    shareReplay({
      bufferSize: 1,
      refCount: true
    })
  );

  readonly search = this.fb.group({
    query: ['', [Validators.required]]
  });

  @ViewChild('queryControl', { static: true })
  queryControl: ElementRef;

  isSubmitting = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.queryControl.nativeElement.focus();

    this.activatedRoute.queryParamMap
      .pipe(
        untilDestroyed(this),
        map(paramMap => paramMap.get('query'))
      )
      .subscribe(this.executeSearch.bind(this));
  }

  ngOnDestroy(): void {}

  submit() {
    const { search } = this;

    if (this.isSubmitting) { return; }
    if (search.invalid) {
      // Expose validation error styling on the template
      this.search.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Search is executed via `activatedRoute.queryParamMap` subscription
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: search.value
    });
  }

  private executeSearch(query: string = ''): void {
    if (!query) { return; }

    this.search.reset({ query });

    this.searchService.search({ query })
      .pipe(tap(() => {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: this.handleSearchSuccess.bind(this),
        error: this.handleSearchError.bind(this)
      });
  }

  private handleSearchSuccess(results: SearchResultsCollection): void {
    this.searchResults.next(results);
  }

  private handleSearchError(err): void {
    this.searchResults.next(undefined);
    console.error(err);
  }
}
