import { TestBed, async } from '@angular/core/testing'; // 1
import { ROUTES } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantsComponent } from './restaurants.component';
 import {RouterTestingModule} from "@angular/router/testing";
import { HomeComponent } from '../home/home.component';
import { RestaurantsService } from './restaurants.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from '../security/login/login.component';

 
describe('RestaurantsComponent', () => { 

    let component: RestaurantsComponent
  //  let service: RestaurantsService
  beforeEach(async(() => { 
    TestBed.configureTestingModule({
        imports: [
           HttpClientTestingModule,
        RouterTestingModule.withRoutes([{path: '', component:HomeComponent}])
          ],
      declarations: [
        RestaurantsComponent,RestaurantComponent,HomeComponent
      ],
      providers:[RestaurantsService]


 
    }).compileComponents();

   // component = TestBed.get(RestaurantsComponent)
   // service = TestBed.get(RestaurantsService);

  })
  );
 
  it('should create the RestaurantsComponent', () => { 
    const fixture = TestBed.createComponent(RestaurantsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


  // it('should add to favourtires', ()=>{
  //     let id = "Peru";
  //     //let favourite = [];
  //     const fixture = TestBed.createComponent(RestaurantsComponent);
  //     let component = fixture.debugElement.componentInstance;
  //     component.favourite = ["Peru"]
  //     spyOn( component, "toggleSelected")
  //     component.toggleSelected(id, {target:"fa fa-"})
  //     expect(component.favourite).toEqual([]);
  // })

  it('should show favourites', ()=>{
    const fixture = TestBed.createComponent(RestaurantsComponent);
    let component = fixture.debugElement.componentInstance;
    let dummRes = [{_id:"Peru"}, {_id:"Casa"} , {_id:"Del"}]
    component.restaurants = dummRes
    component.favourite = ['Del']
    component.showFavourite();
    expect(component.restaurants).toEqual([{_id:"Del"}])  
  })

  it('should call getALLRestaurant method from clear method',() =>{
    const fixture = TestBed.createComponent(RestaurantsComponent);
    let component = fixture.debugElement.componentInstance;
     spyOn(component, 'getAllRestaurants');
    component.clearFilter();
    expect(component.getAllRestaurants).toHaveBeenCalled();
  })

});