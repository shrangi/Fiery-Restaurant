import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {MenuItem} from './menu-item.model';

@Component({
    selector: 'lacc-menu-item',
    templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit {

    @Input() menuItem: any;
    @Output() add = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    emitAddEvent() {
        this.add.emit(this.menuItem);
        console.log(this.menuItem);
        
    }
}
