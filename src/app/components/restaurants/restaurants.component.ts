import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {switchMap, tap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';
import { MenuItem } from './restaurant-detail/menu-item/menu-item.model';
import { Review } from './restaurant-detail/reviews/reviews.model';

import {Restaurant} from './restaurant/restaurant.model';
//import {RestaurantsService} from './restaurants-json.service';
import {RestaurantsService} from "./restaurants.service";

@Component({
    selector: 'lacc-restaurants',
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

    restaurants: any[] = [];
   // menuItems: MenuItem[] = [];
   // reviews: Review[] = [];

    constructor(private restaurantService: RestaurantsService) {
    }

    ngOnInit() {
        // this.restaurantService.getAllRestaurants()
        //     .pipe(
        //         //tap(restaurants => console.log('R: ', restaurants))
        //     )
        //     .subscribe(restaurants => this.restaurants = restaurants);

        // this.restaurants = this.restaurantService.getAllRestaurants();  Previous
        this.getAllRestaurants();
        this.restaurantService.getLocation();
        
    }
    getAllRestaurants():void {
        this.restaurantService.getAllRestaurants().subscribe(res=> this.restaurants=res.data, 
        err=>console.log("Cannot get all restaurants"));
        
        console.log(this.restaurants);
        
    }

    getLocation(){
        let coords = this.restaurantService.getLocation();

       // this.restaurantService.
    }

    // getReviewsOfRestaurants(id: string):Review[] {
    //     return this.reviews;
    // }

    favourite:any[]=[];
 toggleSelected(id:string,$event) {

        let currentElement: any = $event.target || $event.srcElement;
        
        console.log(currentElement.classList)
        if(currentElement.classList.contains('fa-heart-o'))
        {  // Adding to favourite
            currentElement.classList.remove('fa-heart-o')
            currentElement.classList.add('fa-heart');
        
        }
        else
        { // Removing from favourite
            currentElement.classList.remove('fa-heart')
            currentElement.classList.add('fa-heart-o');
            
        }
        
       
        if(!this.favourite.find(x => x === id)){
            this.favourite.push(id);
        }
        else{
            this.favourite.splice(this.favourite.findIndex(x=> x===id), 1)
        }

        console.log("added to fav",this.favourite);
      }

      showFavourite(){
        console.log("inside show")
        this.restaurants = this.restaurants.filter(x => this.favourite.find(y=> y === x._id) )
        console.log(this.restaurants)

    }

    clearFilter() {
        this.getAllRestaurants();
        
    }
}


