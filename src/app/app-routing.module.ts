import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_ROUTES } from '@shared/const';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [PublicGuard],
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'contacts',
    canActivate: [ProtectedGuard],
    loadChildren: () => import('./modules/contacts/contacts.module').then((m) => m.ContactsModule),
  },
  { path: '**', redirectTo: APP_ROUTES.contacts }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
