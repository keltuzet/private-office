import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_SUCCESS_CONFIG, SNACKBAR_ERROR_CONFIG } from '@core/const';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  actionClose = 'закрыть';

  constructor(private snackbar: MatSnackBar, private zone: NgZone) {}

  public showSuccess(message: string, action: string) {
    this.snackbar.open(message, action, SNACKBAR_SUCCESS_CONFIG);
  }

  public showSuccessSaved(message: string = 'Успешно сохранен', action: string = this.actionClose) {
    this.showSuccess(message, action);
  }

  public showSuccessDeleted(message: string = 'Успешно удалено', action: string = this.actionClose) {
    this.showSuccess(message, action);
  }

  public showWarn(message: string) {
    this.zone.run(() => {
      this.snackbar.open(message, this.actionClose, SNACKBAR_ERROR_CONFIG);
    });
  }
}
