import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule as NgxAuthModule, AUTH_SERVICE, PUBLIC_FALLBACK_PAGE_URI, PROTECTED_FALLBACK_PAGE_URI } from 'ngx-auth';

@NgModule({
  imports: [HttpClientModule, ServiceModule.forRoot(''), NgxAuthModule]
})
export class AuthModule {
  static forRoot({ timeOut, appName, logoutUrl, rememberKey, statuses, authKeys, apiConfig, homeUrl }: AuthConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [

      ]
    };
  }
}
