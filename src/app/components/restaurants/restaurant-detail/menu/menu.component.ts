import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {MenuItem} from '../menu-item/menu-item.model';
import {RestaurantsService} from '../../restaurants.service';
//import {RestaurantsService} from '../../restaurants-json.service';

@Component({
    selector: 'lacc-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

    // menu: Observable<MenuItem[]>;
    menu: MenuItem[];
    menuItems: any[];

    constructor(private restaurantService: RestaurantsService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        // this.menu = this.restaurantService.getMenuOfRestaurant(this.route.parent.snapshot.params['id']);
        console.log(this.route.parent.snapshot.params['id']);
        
        this.restaurantService.getMenuOfRestaurant(this.route.parent.snapshot.params['id'])
        .subscribe(items=> this.menuItems=items.data, 
            err=>console.log("Cannot get all menuItems"));
   
    }

    getMenuOfRestaurant(id: string):void {
       
         
    }
}
