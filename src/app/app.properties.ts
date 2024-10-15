import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

export const REST_BASE_URL = '/api/v1';

export const LOCAL_STORAGE_KEYS = {
  CART: 'cart',
};

interface NotificationConfig {
  DURATION: number,
  POSITION: MatSnackBarHorizontalPosition,
}

export const NOTIFICATION_CONFIG: NotificationConfig = {
  DURATION: 5000,
  POSITION: 'end',
};
