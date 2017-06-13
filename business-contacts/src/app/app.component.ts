import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Business } from './business';
import { Category } from './category';
import { ModalComponent } from './modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { AddContactComponent } from './modals/add-contact.component';
import { EditContactComponent } from './modals/edit-contact.component';
import { DetailsContactComponent } from './modals/details-contact.component';
import { ValidationService } from './services/validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService,
              DialogService,
              ValidationService]
})
export class AppComponent implements OnInit {
  
  businesses: Business[];
  categories: Category[];
  appState: string;
  activeKey: string;
  constructor(private _firebaseService: FirebaseService, 
              private _dialogService:DialogService) {
    
  }
  ngOnInit(){
    this._firebaseService.getBusinesses().
        subscribe(businesses =>{
          console.log(businesses);
          this.businesses = businesses;
    });

    this._firebaseService.getCategories().
        subscribe(categories =>{
          console.log(categories);
          this.categories = categories;
    });
  }


  filterCategory(category){
    this._firebaseService.getBusinesses(category).
        subscribe(businesses =>{
          console.log(businesses);
          this.businesses = businesses;
    });
  }

 showAddNewBusinessModal(){

      let disposable = this._dialogService.addDialog(AddContactComponent)
                .subscribe((isConfirmed) => {
                    //We get dialog result
                    if(isConfirmed) {
                        alert('accepted');
                    }
                    else {
                        alert('declined');
                    }
                });
            //We can close dialog calling disposable.unsubscribe();
            //If dialog was not closed manually close it by timeout
            
}

showEditBusinessModal(index: number, key){
  
  this._firebaseService.index = index;
  this._firebaseService.businesskey = key;
  console.log(index);
  console.log('businessKeys', key)
  let disposable = this._dialogService.addDialog(EditContactComponent)
      .subscribe((isCondirmed) => {

      });
    
}

showBusinessDetailsModal(key){
  console.log('showing details for: ', key);
   let disposable = this._dialogService.addDialog(DetailsContactComponent)
      .subscribe((isCondirmed) => {

      });
}

deleteBusiness(key){
  this._firebaseService.deleteBusiness(key);
}

// on up button clicked
onUpBtnClick(key, index){
  let business: Business;
  for (let entry of this.businesses) {
    console.log('entry ',entry);
    if(entry.$key === key){
      business = entry;
    }
  }
  this.businesses[index] = this.businesses[index-1];
  this.businesses[index-1] = business;
}
// on down button clicked

onDownBtnClick(key, index){
let business: Business;
  for (let entry of this.businesses) {
    console.log('entry ',entry);
    if(entry.$key === key){
      business = entry;
    }
  }
  this.businesses[index] = this.businesses[index+1];
  this.businesses[index+1] = business;
}



  
}
