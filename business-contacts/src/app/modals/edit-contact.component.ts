import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from  'ng2-validation';
import { Business } from '../business';
import { Category } from '../category';
import { FirebaseService } from '../services/firebase.service';



@Component({
    moduleId: module.id,
    selector: 'edit-contact',
    templateUrl: 'edit-contact.component.html'
})
export class EditContactComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  categories: Category[];
  business: Business;
  newBusiness : Business;
  updBusiness : Business;
  public businessForm: FormGroup;

  constructor(private _dialogService: DialogService, 
              private _fb: FormBuilder, 
              private _firebaseService: FirebaseService) {
    super(_dialogService);
    this.businessForm = _fb.group({
        company: new FormControl('', Validators.required),
        representative: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        phone: new FormControl('',[ Validators.required, CustomValidators.phone('JP')]),
        email: new FormControl('', [Validators.required, CustomValidators.email]),
        city: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        yearsInBusiness: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)

    });
    this.businessForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  ngOnInit(){

    this._firebaseService.getCategories().
    subscribe(categories => {
      this.categories = categories;
    });
   this.business = this._firebaseService.getBusiness();

    // init forms with business contact
    this.businessForm.patchValue({
        company: this.business.company,
        representative: this.business.representative,
        category: this.business.category,
        phone: this.business.phone,
        email: this.business.email,
        city: this.business.city,
        address: this.business.street_address,
        yearsInBusiness: this.business.years_in_business,
        description: this.business.description
    });

    console.log('businessForm', this.businessForm);
  
  }

  onValueChanged(data?: any){
    if(!this.businessForm){
        return;
    }
    const form = this.businessForm;

    for (const field in this.formErrors){
        // clear previous error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
                this.formErrors[field] += messages[key] + ' ';
            }

        }
    }
  }

  formErrors = {
      'company': '',
      'email': '',
      'phone': '',
      'representative': ''
  };

  validationMessages = {
      'company': {
          'required': 'Company is required'
      },
      'email' : {
          'required': 'email is required',
          'email': 'Please enter a correct email address',
          
      },
      'phone' : {
          'required': 'phone number is required',
          'phone' : 'please enter a valid phone number'
      },
      'representative' :{
          'required': 'representative name is required'
      }
  }



  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    console.log(this.businessForm);

    this.updBusiness = {
        category: this.businessForm.controls['category'].value,
        representative: this.businessForm.controls['representative'].value,
        city: this.businessForm.controls['city'].value,
        created_at: '0', 
        company: this.businessForm.controls['company'].value,
        description: this.businessForm.controls['description'].value,
        years_in_business: this.businessForm.controls['yearsInBusiness'].value,
        street_address: this.businessForm.controls['address'].value,
        phone: this.businessForm.controls['phone'].value,
        email: this.businessForm.controls['email'].value

    }
    console.log('updated business', this.updBusiness)
    this._firebaseService.updateBusiness(this.updBusiness);
    this.result = true;
    this.close();
  }


}

export interface ConfirmModel {
  title:string;
  message:string;
}
 