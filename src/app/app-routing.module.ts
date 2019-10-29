import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoSessionGuard } from './core/services/guards/no-session.guard';
import { SessionGuard } from './core/services/guards/session.guard';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoSessionGuard]
  },

  {
    path: '',
    component: SearchComponent,
    canActivate: [SessionGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
