import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { NotificationService } from '@core/services/notification.service';
import { ContactModalComponent } from './components';
import { ContactFilterModel, ContactModel } from './models';
import { CONCTACT_TABLE_FILTER_FIELDS_CONFIG } from './const';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit {
  public tableCols: string[] = ['email', 'phone-number', 'address', 'social-networks', 'actions'];
  public contacts$: Observable<ContactModel[]>;
  public filterForm = new FormGroup({});
  public filterFields = CONCTACT_TABLE_FILTER_FIELDS_CONFIG;

  private reload$ = new BehaviorSubject<void>(null);
  private $subscription = new Subscription();

  constructor(private apiServise: ContactsService, private dialog: MatDialog, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.contacts$ = this.reload$.pipe(switchMap(() => this.apiServise.getContacts(this.filterForm.value as ContactFilterModel)));
  }

  handleOpenContactModal(id?: number): void {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe((update: boolean) => {
      if (update) {
        this.reload$.next();
      }
    });
  }

  handleRemoveContact(id: number): void {
    this.$subscription.add(
      this.apiServise.removeContact(id).subscribe(() => {
        this.notificationService.showSuccessDeleted();
        this.reload$.next();
      }),
    );
  }

  handleSearch(): void {
    this.reload$.next();
  }
}
