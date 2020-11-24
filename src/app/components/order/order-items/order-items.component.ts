import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartItem} from '../../restaurants/restaurant-detail/shopping-cart/cart-item.model';

@Component({
    selector: 'lacc-order-items',
    templateUrl: './order-items.component.html',
    styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

    @Input() items: any[];
    @Output() increaseQtd = new EventEmitter<any>();
    @Output() decreaseQtd = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    emitIncreaseQtd(item: CartItem) {
        this.increaseQtd.emit(item);
    }

    emitDecreaseQtd(item: CartItem) {
        this.decreaseQtd.emit(item);
    }

    emitRemove(item: CartItem) {
        this.remove.emit(item);
    }

}
