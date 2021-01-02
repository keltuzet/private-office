import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

import { NotificationService } from '@core/services';
import { ContactsService } from '@modules/contacts/contacts.service';
import { ContactBaseModel } from '@modules/contacts/models';
import { CONCTACT_FIELDS_CONFIG } from '@modules/contacts/const';

@Component({
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
})
export class ContactModalComponent implements OnInit, OnDestroy {
  contactFields = cloneDeep(CONCTACT_FIELDS_CONFIG);
  contactForm = new FormGroup({});
  form = new FormGroup({});
  $subscription: Subscription = new Subscription();

  constructor(
    private apiService: ContactsService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<ContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public id?: number,
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.$subscription.add(this.apiService.getContactById(this.id).subscribe((contact) => this.contactForm.patchValue(contact)));
    }
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

  public handleSubmit(): void {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      return;
    }

    const formValue: ContactBaseModel = this.contactForm.getRawValue();
    const stream$: Observable<void | number> = this.id
      ? this.apiService.editContact(this.id, formValue)
      : this.apiService.createContact(formValue);

    this.$subscription.add(
      stream$.subscribe(() => {
        this.notificationService.showSuccessSaved();
        this.handleClose(true);
      }),
    );
  }

  public handleClose(update = false): void {
    this.dialogRef.close(update);
  }
}
