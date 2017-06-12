import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ModalComponent } from './modal.component';
import { AddContactComponent } from './modals/add-contact.component';
import { EditContactComponent } from './modals/edit-contact.component';
import { DetailsContactComponent } from './modals/details-contact.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    AddContactComponent,
    EditContactComponent,
    DetailsContactComponent
  ],
  imports: [
    BrowserModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BootstrapModalModule,
    ReactiveFormsModule 

  ],
  providers: [],
   entryComponents: [
        AddContactComponent,
        EditContactComponent,
        DetailsContactComponent
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
