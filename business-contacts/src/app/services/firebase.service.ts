import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Business } from '../business';
import { Category } from '../category';
import 'rxjs/add/operator/map'; 

@Injectable()
export class FirebaseService{
    businesses: FirebaseListObservable<Business[]>;
    categories: FirebaseListObservable<Category[]>;
    business: Business;
    public index: number;
    public businesskey;

    constructor(private _db: AngularFireDatabase){

    }
    getBusiness(){
        console.log('index', this.index);
        let business: Business;
        this.getBusinesses().subscribe(businesses => {
            business = businesses[this.index];
        })
        console.log(business);
        return business;
    }
    getBusinesses(category: string = null){
        if (category != null){
            this.businesses = this._db.list('/businesses', {
                query: {
                    orderByChild: 'category',
                    equalTo: category
                }
            }) as
            FirebaseListObservable<Business[]>;
        } else {
            this.businesses = this._db.list('/businesses') as
            FirebaseListObservable<Business[]>;
        }
        
        return this.businesses;
    }

     getCategories(){
        this.categories = this._db.list('/categories') as
        FirebaseListObservable<Category[]>;
        return this.categories;
    }

    addBusiness(newBussiness: Business){
        console.log('will add a new business', newBussiness);
        return this.businesses.push(newBussiness);

    }

    updateBusiness(updBusiness: Business){
        console.log('business will update');
        return this.businesses.update(this.businesskey, updBusiness);
    }

    deleteBusiness(key){
        return this.businesses.remove(key);
    }
}