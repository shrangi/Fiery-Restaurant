import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'lacc-restaurant-detail',
    templateUrl: './restaurant-detail.component.html',
    styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
    @Input() res: any;
    constructor() {
    }

    ngOnInit() {
    }

}
