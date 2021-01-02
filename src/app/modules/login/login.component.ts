import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({});
  loginFieldsConfig = LOGIN_FIELDS_CONFIG;

  constructor(private authenticationService: AuthenticationService, private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.getRawValue() as Login).subscribe(() => {
      this.router.navigateByUrl(this.authService.getInterruptedUrl());
    });
  }
}
