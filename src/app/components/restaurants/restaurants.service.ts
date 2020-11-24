import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Restaurant} from './restaurant/restaurant.model';
import {MenuItem} from './restaurant-detail/menu-item/menu-item.model';
import {Review} from './restaurant-detail/reviews/reviews.model';
import {RESTAURANT_API} from '../../app.constants';
import { environment } from '../../../environments/environment';

@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient) {
    }

    getLocation(){
        let position = {lat:null,lng:null}
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((pos)=>{
                position.lat=pos.coords.latitude;
                position.lng=pos.coords.longitude;
            },err=>(console.log(err.message)))
        }
        console.log(position);
        
        return position;
        
    }

    getCoordsOfLocation(loc:string){
        return this.http.get(`
        ${environment.mapbox_api}/${loc}.json?
        access_token=${environment.mapbox_access_token}`
        )
    }

    getLocationofCoords(coords){
        return this.http.get(`
        ${environment.mapbox_api}/${coords.lng},${coords.lat}.json?
        access_token=${environment.mapbox_access_token}`
        )
    }

    getAllRestaurants(): Observable<any> {
        return this.http.get<Restaurant[]>(`${RESTAURANT_API}/api/v1/restaurants`);
    }

    getMenuOfRestaurant(id: string): Observable<any> {
        return this.http.get<MenuItem[]>(`${RESTAURANT_API}/api/v1/menuitems/${id}`);
    }


    getReviewsOfRestaurants(id: string): Observable<any> {
        return this.http.get<Review>(`${RESTAURANT_API}/api/v1/restaurants/${id}/reviews`);
    }
}
