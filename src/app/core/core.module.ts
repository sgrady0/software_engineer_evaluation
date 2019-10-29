import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from './services/session/session.service';
import { SessionGuard } from './services/guards/session.guard';
import { NoSessionGuard } from './services/guards/no-session.guard';
import { SearchService } from './services/search/search.service';

@NgModule({
  declarations: [],
  providers: [
    SearchService,
    SessionService,
    SessionGuard,
    NoSessionGuard
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) { throw new Error('CoreModule is already loaded. Import it in the AppModule only'); }
  }
}
