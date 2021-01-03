import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Login } from '@core/models';
import { AuthenticationService } from '@core/services';
import { LOGIN_FIELDS_CONFIG } from './login.fields-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public loginForm = new FormGroup({});
  public loginFieldsConfig = LOGIN_FIELDS_CONFIG;

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  handleSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.getRawValue() as Login).subscribe(() => {
      this.router.navigateByUrl(this.authenticationService.getInterruptedUrl());
    });
  }
}
