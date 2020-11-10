import { Component, OnInit } from "@angular/core";
import { OrdersService } from "./orders.service";
import { Orders } from "./orders.model";

@Component({
  selector: "lacc-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  orders: Orders[];

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.orders = this.ordersService.Orders;
  }

  reOrder(re_order: any) {
    console.log(this.orders);
    console.log(re_order);
  }
}
