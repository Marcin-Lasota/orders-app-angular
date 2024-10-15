import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderDialogComponent } from './new-order-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NewOrderDialogComponent', () => {
  let component: NewOrderDialogComponent;
  let fixture: ComponentFixture<NewOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrderDialogComponent, NoopAnimationsModule],
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef, useValue: {
            updateSize: () => {
            },
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
