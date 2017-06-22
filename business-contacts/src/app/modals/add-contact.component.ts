import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Business } from '../business';
import { Category } from '../category';
import { FirebaseService } from '../services/firebase.service';
import { CustomValidators } from  'ng2-validation';



@Component({
    moduleId: module.id,
    selector: 'add-contact',
    templateUrl: 'add-contact.component.html'
})
export class AddContactComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  categories: Category[];
  newBusiness: Business;
  public newBusinessForm: FormGroup;
  public isValid: boolean = true;

  constructor(private _dialogService: DialogService,
              private _fb: FormBuilder,
              private _firebaseService: FirebaseService) {
    super(_dialogService);
    this.newBusinessForm = _fb.group({
        company: new FormControl('', Validators.required),
        representative: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.required, CustomValidators.phone('JP')]),
        email: new FormControl('', [Validators.required, CustomValidators.email]),
        city: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        yearsInBusiness: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)

    });
    this.newBusinessForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  ngOnInit(){
    this._firebaseService.getCategories().
    subscribe(categories => {
      this.categories = categories;
    });
  }

  onValueChanged(data?: any){
    if(!this.newBusinessForm){
        return;
    }
    const form = this.newBusinessForm;

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
    console.log('formErrors',this.formErrors);

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
    this.isValid = false;
    console.log(this.isValid);
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    console.log(this.newBusinessForm);

    for (const field in this.formErrors){
      const control = this.newBusinessForm.get(field);
      if (control.untouched) {
        this.isValid = false;
      } else if (this.formErrors[field] == ''){ 
        this.isValid = true;
      } else this.isValid = false;

    }
    console.log('form validity: ', this.isValid);
    if (this.isValid) {
      this.newBusiness = {
        category: this.newBusinessForm.controls['category'].value,
        representative: this.newBusinessForm.controls['representative'].value,
        city: this.newBusinessForm.controls['city'].value,
        created_at: '0',
        company: this.newBusinessForm.controls['company'].value,
        description: this.newBusinessForm.controls['description'].value,
        years_in_business: this.newBusinessForm.controls['yearsInBusiness'].value,
        street_address: this.newBusinessForm.controls['address'].value,
        phone: this.newBusinessForm.controls['phone'].value,
        email: this.newBusinessForm.controls['email'].value

      }
      console.log('new business', this.newBusiness)
      this._firebaseService.addBusiness(this.newBusiness);
      this.result = true;
      this.close();
    }
    
  }

    

}

export interface ConfirmModel {
  title:string;
  message:string;
}