import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { NOTIFICATION_CONFIG } from '../../app.properties';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  showSuccess(message: string) {
    this.openSnackBar(message, 'success-snackbar');
  }

  showError(error: HttpErrorResponse, message: string) {
    switch (error.status) {
      case 504:
        this.showErrorMessage(`${message}: Could not connect to the server`);
        break;
      default:
        if (error.status >= 500) {
          this.showErrorMessage(`${message}: Server error`);
        } else if (error.error && error.error.message) {
          this.showErrorMessage(`${message}: ${error.error.message}`);
        } else if (error.error && error.error.detail) {
          this.showErrorMessage(`${message}: ${error.error.detail}`);
        } else {
          this.showErrorMessage(message);
        }
    }
  }

  private showErrorMessage(message: string) {
    this.openSnackBar(message, 'error-snackbar');
  }

  private openSnackBar(message: string, cssClass: string) {
    this.snackBar.open(message,
      'Close', {
        horizontalPosition: NOTIFICATION_CONFIG.POSITION,
        duration: NOTIFICATION_CONFIG.DURATION,
        panelClass: [cssClass],
      });
  }
}
