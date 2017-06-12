import { Injectable } from '@angular/core';

@Injectable()

export class ValidationService {

 onValueChanged(form, data?: any ){
     console.log('form from validation service',form);
    if(!form){
        return;
    }

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
      'phone': ''
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
      }
  }

}