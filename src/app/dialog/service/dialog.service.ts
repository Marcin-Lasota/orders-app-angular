import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewOrderDialogComponent } from '../new-order-dialog/new-order-dialog.component';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';
import { lastValueFrom } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dailog/confirmation-dialog.component';
import { OrderInfo } from '../../shared/model/order-info';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  openCreateOrderDialog() {
    return this.dialog.open(NewOrderDialogComponent, { maxWidth: '700px' });
  }

  openOrderDetailsDialog(orderInfo: OrderInfo) {
    return this.dialog.open(OrderDetailsDialogComponent, { data: { orderInfo }, maxWidth: '700px' });
  }

  openConfirmationDialog(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message },
    });

    return lastValueFrom(dialogRef.afterClosed());
  }
}
