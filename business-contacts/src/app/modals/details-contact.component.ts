import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService,  } from 'ng2-bootstrap-modal';
import { FirebaseService } from '../services/firebase.service';
import { Business } from '../business';
@Component ({
    moduleId: module.id,
    selector: 'details-contact',
    templateUrl: 'details-contact.component.html'
})

export class DetailsContactComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  public business: Business;
  constructor(dialogService: DialogService,
    private _firebaseService: FirebaseService
    ) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }
  ngOnInit() {
    this.business = this._firebaseService.getBusiness();
  }

}

export interface ConfirmModel {
  title: string;
  message: string;
}
