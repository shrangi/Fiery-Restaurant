import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from './restaurant.model';

@Component({
    selector: 'lacc-restaurant',
    templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit {

    @Input() restaurant: any;

    constructor() {
    }

    ngOnInit() {
    }

}
