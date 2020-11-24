
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { inject, TestBed } from "@angular/core/testing";
import { environment } from "../../../environments/environment";
import { RESTAURANT_API } from "../../app.constants";
import {RestaurantsService} from "./restaurants.service"

describe("restaurants service", function(){
    let restaurantsService: RestaurantsService;
    let httpMock: HttpTestingController;
    //let httpClientSpy: { get: jasmine.Spy };
    
    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [RestaurantsService],
          imports: [
            HttpClientTestingModule,
        
          ],
        });

        restaurantsService= TestBed.get(RestaurantsService)
        httpMock = TestBed.get(HttpTestingController)
    });

    afterEach(()=>{
        httpMock.verify();
    })

    it('should return list of restaurants via get method', ()=>{

        const dummyRes = [
            {
                "typeOfFood": [
                    "Apple Juice",
                    "Chicken Roast",
                    "Cheese Burger"
                ],
                "_id": "5ebbee65989baa37b8d71ca3",
                "userName": "Kolkata House",
                "userEmail": "0857597711@gmail.com",
                "isRestaurant": true,
                "userGender": "MALE",
                "userAge": 27,
                "usercity": "Hyderabad",
                "userregion": "Kondapur",
                "userCountry": "India",
                "userProfileImageUrl": "http://res.cloudinary.com/dwakc7e0d/image/upload/v1587529499/food-app/presignup/2020-04-22T04:24:59.289Z.png",
                "CUSINE_CATEGORY": "Bengali,Chinese,North Indian,Seafood,Rolls",
                "CUSINE_TYPE": "Casual Dining",
                "TIMING": "11am to 11pm(Mon-Sun)",
                "createdAt": "2020-05-13T12:56:01.375Z",
                "updatedAt": "2020-05-13T12:56:01.375Z",
                "__v": 0
            },
            {
                "typeOfFood": [
                    "Apple Juice",
                    "Chicken Roast",
                    "Cheese Burger"
                ],
                "_id": "5ebbee65989baa37b8d71ca2",
                "userName": "Sarvi Restaurant",
                "userEmail": "4463213537@gmail.com",
                "isRestaurant": true,
                "userGender": "MALE",
                "userAge": 27,
                "usercity": "Hyderabad",
                "userregion": "Banjara Hills",
                "userCountry": "India",
                "userProfileImageUrl": "http://res.cloudinary.com/dwakc7e0d/image/upload/v1587529499/food-app/presignup/2020-04-22T04:24:59.289Z.png",
                "CUSINE_CATEGORY": "Biryani,North Indian,Mughlai,Chinese,Hyderabadi",
                "CUSINE_TYPE": "Casual Dining",
                "TIMING": "12noon to 430pm,7pm to 1130pm(Mon-Sun)",
                "createdAt": "2020-05-13T12:56:01.375Z",
                "updatedAt": "2020-05-13T12:56:01.375Z",
                "__v": 0
            }
            ]
        
        restaurantsService.getAllRestaurants().subscribe(res=>{
            expect(res.length).toBe(2);
            expect(res).toEqual(dummyRes)
        })
        
        const request = httpMock.expectOne(`${RESTAURANT_API}/api/v1/restaurants`)

        expect(request.request.method).toBe('GET')

        request.flush(dummyRes);
         
    })

    it(`should return list of menu items of a restaurant via get method`,()=>{
        let dummyMenuList = [{"_id":1, "itemName": "Idli"}, {"_id":2, "itemName": "Lassi"}, {"_id":3, "itemName": "Pizza"}]
        let restaurantId = "abcd";

        restaurantsService.getMenuOfRestaurant(restaurantId).subscribe(res=>{
            expect(res.length).toBe(3);
            expect(res).toEqual(dummyMenuList)
        })

        const request = httpMock.expectOne(`${RESTAURANT_API}/api/v1/menuitems/${restaurantId}`)

        expect(request.request.method).toBe('GET')

        request.flush(dummyMenuList);

    })

    it('should get coords of location', ()=>{
        let dummyLoc = {lat:'34.785', lng:'78.324'};
        let location = "Bangalore"
        restaurantsService.getCoordsOfLocation(location).subscribe(res=>{
            expect(res).toEqual(dummyLoc)
        })

        const request = httpMock.expectOne(`
        ${environment.mapbox_api}/${location}.json?
        access_token=${environment.mapbox_access_token}`)

        expect(request.request.method).toBe('GET')

        request.flush(dummyLoc);

    })

    it('should get location from coords', ()=>{
        let dummyLoc = {lat:'34.785', lng:'78.324'};
        let location = "Bangalore"
        restaurantsService.getLocationofCoords(dummyLoc).subscribe(res=>{
            expect(res).toEqual(location)
        })

        const request = httpMock.expectOne(`
        ${environment.mapbox_api}/${dummyLoc.lng},${dummyLoc.lat}.json?
        access_token=${environment.mapbox_access_token}`)

        expect(request.request.method).toBe('GET')

        request.flush(location);

    })


})