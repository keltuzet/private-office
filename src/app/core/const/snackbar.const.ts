import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const SNACKBAR_SUCCESS_CONFIG: MatSnackBarConfig = Object.freeze({
  duration: 3000,
});
export const SNACKBAR_ERROR_CONFIG: MatSnackBarConfig = Object.freeze({
  duration: 5000,
  panelClass: ['snackbar-error'],
});
