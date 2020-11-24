import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { RestaurantsService } from '../../../restaurants/restaurants.service';
//import { MenuItem } from '../../../restaurants/restaurant-detail/menu-item/menu-item.model';
//import { RestaurantsService } from '../../../restaurants/restaurants-json.service';


@Component({
    selector: 'lacc-reservation-menu',
    templateUrl: './reservation-menu.component.html',
    styleUrls: ['./reservation-menu.component.css']
})

export class ReservationMenuComponent implements OnInit {

    menuItems: any[];
    id:string;

    constructor(private route: ActivatedRoute, private restaurantService: RestaurantsService) {
    }

    ngOnInit() {
        this.id = this.route.parent.snapshot.params['id'];
       
          
        this.restaurantService.getMenuOfRestaurant(this.route.parent.snapshot.params['id'])
        .subscribe(items=> {
            let allItems = items.data;
            let uniqueItems = []; 
            allItems.forEach(item => {
               if( !uniqueItems.find(el=> item.itemTitle==el.itemTitle))
                    uniqueItems.push(item)
            });
            this.menuItems= uniqueItems; }, 
            err=>console.log("Cannot get all menuItems"));
   
    }

}
