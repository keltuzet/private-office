import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [ContactsComponent, ContactModalComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyMatFormFieldModule,
    FormlyMaterialModule,
    NgxSpinnerModule,
  ],
})
export class ContactsModule {}
