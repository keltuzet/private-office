import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseHttpService } from '@core/services';
import { SPINNER_NAMES } from '@shared/const';
import { ContactModel, ContactBaseModel, ContactFilterModel } from './models';

@Injectable({
  providedIn: 'root',
})
export class ContactsService extends BaseHttpService {
  contactsController = 'contacts';

  constructor(injector: Injector) {
    super(injector);
  }

  getContacts(filter: ContactFilterModel): Observable<ContactModel[]> {
    return this.get<ContactModel[]>(this.contactsController, { spinnerName: SPINNER_NAMES.CONTACTS_TABLE }).pipe(
      map((contacts) => {
        return contacts.filter((item) => {
          return (
            (!filter.searchByAddress || item.address.toLocaleLowerCase().includes(filter.searchByAddress.toLocaleLowerCase())) &&
            (!filter.searchByEmail || item.email.toLocaleLowerCase().includes(filter.searchByEmail.toLocaleLowerCase())) &&
            (!filter.searchByPhoneNumber || item.phoneNumber.includes(filter.searchByPhoneNumber))
          );
        });
      }),
    );
  }

  getContactById(id: number): Observable<ContactModel> {
    return this.get<ContactModel>(this.contactsController, { spinnerName: SPINNER_NAMES.CONTACT_FORM, id });
  }

  createContact(contact: ContactBaseModel): Observable<number> {
    return this.post<number>(this.contactsController, contact, { spinnerName: SPINNER_NAMES.CONTACT_FORM });
  }

  editContact(id: number, contact: ContactBaseModel): Observable<void> {
    return this.put<void>(this.contactsController, contact, { spinnerName: SPINNER_NAMES.CONTACT_FORM, id });
  }

  removeContact(id: number): Observable<void> {
    return this.delete<void>(this.contactsController, { spinnerName: SPINNER_NAMES.CONTACTS_TABLE, id });
  }
}
