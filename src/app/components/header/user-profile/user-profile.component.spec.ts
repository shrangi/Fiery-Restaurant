import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../security/login/login.service';

import { UserProfileComponent } from './user-profile.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

import { ROUTES} from '../../../app.routes';
import { HomeComponent } from '../../home/home.component';
import { LoginComponent } from '../../security/login/login.component';
// import { ChangePasswordComponent } from '../../change-password/change-password.component';
import { RestaurantComponent } from '../../restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from '../../restaurants/restaurant-detail/restaurant-detail.component';
import { MenuComponent } from '../../restaurants/restaurant-detail/menu/menu.component';
import { ReviewsComponent } from '../../restaurants/restaurant-detail/reviews/reviews.component';
import { RestaurantsComponent } from '../../restaurants/restaurants.component';

import { OrderComponent } from '../../order/order.component';
import { OrdersComponent } from '../../orders/orders.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { InputComponent } from '../../shared/input/input.component';
import { MenuItemComponent } from '../../restaurants/restaurant-detail/menu-item/menu-item.component';
import { ShoppingCartComponent } from '../../restaurants/restaurant-detail/shopping-cart/shopping-cart.component';
import { SharedModule } from '../../shared/shared.module';
import { CardComponent } from '../../order/card/card.component';
import { OrderModule } from '../../order/order.module';
import { HttpClientModule } from '@angular/common/http';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UserProfileComponent, 
        HomeComponent,
        LoginComponent,
        RestaurantDetailComponent,
        MenuComponent,
        RestaurantComponent,
        ReviewsComponent,
        RestaurantsComponent,
        OrdersComponent,
        NotFoundComponent,
        MenuItemComponent,
        ShoppingCartComponent,

      ],
      imports: [
        FormsModule,
        OrderModule,
        HttpClientModule,
        SharedModule.forRoot(),
        RouterTestingModule.withRoutes(ROUTES)
      ],
      providers: [LoginService ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save and cancel button should be disabled if user is not editing', ()=>{
    let isEdit: Boolean= false;
    
  })
});
