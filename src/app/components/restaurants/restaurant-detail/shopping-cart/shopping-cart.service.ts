import {Injectable} from '@angular/core';
import {CartItem} from './cart-item.model';
import {MenuItem} from '../menu-item/menu-item.model';
import {NotificationService} from '../../../shared/messages/notification.service';

@Injectable()
export class ShoppingCartService {

    items: any[] = [];

    constructor(private notificationService: NotificationService) {
    }

    clear() {
        this.items = [];
        this.notificationService.notify(`You have removed all menu items`);
    }
 
    addItem(item: any) {
        const foundItem = this.items.find((mItem) => mItem.menuItem._id === item.id);

        if (foundItem) {
            this.increaseQtd(foundItem);
        } else {
            this.items.push(new CartItem(item));
        }
        this.notificationService.notify(`You added the menu ${item.itemTitle}`);
    }


    increaseQtd(item: any) {
        item.quantity = item.quantity + 1;
    }

    decreaseQtd(item: any) {
        item.quantity = item.quantity - 1;
        if (item.quantity === 0) {
            this.removeItem(item);
        }
    }

    removeItem(item: any) {
        console.log(`Removeu item: ${item.menuItem.itemTitle}`);
        this.items.splice(this.items.indexOf(item), 1);
        this.notificationService.notify(`You have removed the ${item.menuItem.itemTitle}`);
    }

    total(): number {
        return this.items
            .map(item => item.value())
            .reduce((prev, value) => prev + value, 0);
    }
}
