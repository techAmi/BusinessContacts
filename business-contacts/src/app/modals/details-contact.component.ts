import { Component } from '@angular/core';
import { DialogComponent, DialogService,  } from 'ng2-bootstrap-modal';
@Component ({
    moduleId: module.id,
    selector: 'details-contact',
    templateUrl: 'details-contact.component.html'
})

export class DetailsContactComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
}

export interface ConfirmModel {
  title:string;
  message:string;
}