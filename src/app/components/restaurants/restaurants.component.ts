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
    menuItems: MenuItem[] = [];
    reviews: Review[] = [];

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

    


    getReviewsOfRestaurants(id: string):Review[] {
        return this.reviews;
    }

}
