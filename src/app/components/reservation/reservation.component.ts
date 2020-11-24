import { Component, OnInit } from '@angular/core';
import { Restaurant } from './../restaurants/restaurant/restaurant.model';
//import { RestaurantsService } from './../restaurants/restaurants-json.service';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'lacc-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

    restaurants: any[] = [];
    filters: any = {};
    searchBox: string;
    selectedFilters: {} = {
        category: '',
        location: '',
        cuisine: '',
        sort:''
    };

    searchCat: any;
    filter:string;
    filterData: {}={
        restaurant:'',
        location:'',
        cuisine:''
    };

    filterMap:{}={
        restaurant:'userName',
        location: 'usercity',
        cuisine:'CUSINE_CATEGORY'
    }

    allRestaurants:any[];

    constructor(private restaurantService: RestaurantsService, private route: ActivatedRoute,
        private router: Router) {
            this.restaurants=[];
    }

    ngOnInit() {
        this.getAllRestaurants();
        this.filters = this.getFilterData();
        this.restaurantService.getLocation();
        this.searchCat = document.getElementById('searchCat');
        this.restaurants=[];
        this.restaurants = Object.assign([],this.allRestaurants);
    }

     getAllRestaurants(){
        this.restaurantService.getAllRestaurants().
        subscribe(res=> {
            this.allRestaurants=res.data
            .filter(x=>x!==undefined)
            .map(x=>({...x, rating:3.7}));
            
            this.restaurants = Object.assign([],this.allRestaurants);
            }
        )
    }

    // getFiltersData(){
    //     this.restaurantService.getAllRestaurants().
    //     subscribe(res=> this.restaurants=res.data
    //         .map()
    //     );
    // }

     filterRestaurantOnSearch(val: string){ 
        this.filter = this.searchCat.options[this.searchCat.selectedIndex].value
        if(val==null || val=="")
         {    console.log("empty",val)
              this.clearFilter();
            return;
         }

        this.restaurants=Object.assign([],this.allRestaurants.filter(res=> res[this.filterMap[this.filter]].toLowerCase().includes(val.toLowerCase()) 
        || res['userregion'].toLowerCase().includes(val.toLowerCase())));

        if(this.restaurants.length<10){
           let similarRes = this.allRestaurants.filter(res=> res[this.filterMap[this.filter]].toLowerCase().includes(val.toLowerCase()) 
           || res['userregion'].toLowerCase().includes(val.toLowerCase())
           || res['userName'].toLowerCase().includes(val.toLowerCase())
           || res['CUSINE_CATEGORY'].toLowerCase().includes(val.toLowerCase())
           || res['userCountry'].toLowerCase().includes(val.toLowerCase())
           || res['CUSINE_TYPE'].toLowerCase().includes(val.toLowerCase())
           || res['usercity'].toLowerCase().includes(val.toLowerCase())
           )
           
           similarRes.forEach(simRes=>{
              if( !this.restaurants.find(res=>simRes==res) ){
                  this.restaurants.push(simRes);
              }
           })
        }
    }

    getBGcolorForRating(rating: number): string {
        return rating < 2.5 ? 'bg-red' : (rating < 3.5 ? 'bg-orange' : 'bg-green');
    }

    getStarForRating(rating: number, position: number): string {
        let className: string = '';
        switch (position) {
            case 1:
                className = rating >= 1 ? 'fa-star' : (rating < 1 && rating > 0 ? 'fa-star-half-o' : 'fa-star-o');
                break;
            case 2:
                className = rating >= 2 ? 'fa-star' : (rating < 2 && rating > 1 ? 'fa-star-half-o' : 'fa-star-o');
                break;
            case 3:
                className = rating >= 3 ? 'fa-star' : (rating < 3 && rating > 2 ? 'fa-star-half-o' : 'fa-star-o');
                break;
            case 4:
                className = rating >= 4 ? 'fa-star' : (rating < 4 && rating > 3 ? 'fa-star-half-o' : 'fa-star-o');
                break;
            case 5:
                className = rating == 5 ? 'fa-star' : (rating < 5 && rating > 4 ? 'fa-star-half-o' : 'fa-star-o');
                break;
            default:
                className = 'fa-star-o';
                break;
        }
        return className;
    }

    

    clearFilter() {
        let activeElements: any = document.getElementsByClassName('filter-option');
        for (let i: number = 0; i < activeElements.length; i++) {
            activeElements[i].classList.remove('active');
        }
        Object.keys(this.selectedFilters).forEach(k => {
            this.selectedFilters[k] = '';
        });
        this.getAllRestaurants();
    }

    selectFilter(id: string, $event) {
        let currentElement: any = $event.target || $event.srcElement;
        if (document.getElementById(id).getElementsByClassName('active')[0] !== undefined) {
            document.getElementById(id).getElementsByClassName('active')[0].classList.remove('active');
        }
        currentElement.classList.add('active');
        this.filterRestaurants(id, currentElement.innerText);
    }

    navigateToReservationPage(redirectTo: string, id: string) {
        this.router.navigate(['reservation/reservation-entry', id, redirectTo]);
    }

    getFilterData(): {} {
        this.filters = {
            'category': this.getFiterObject('category'),
            'location': this.getFiterObject('area'),
            'cuisine': this.getFiterObject('type')
        };

        return this.filters;
    }

    getFiterObject(type: string): any[] {
        return this.restaurants.map(item => item[type])
            .filter((value, index, self) => self.indexOf(value) === index);
    }

    getFilterCount(name:string, value:string):number{
        return this.restaurants.filter(x => x[name] === value).length;
    }

    filterRestaurants(type, name) {
        this.selectedFilters[type] = name;
        this.getAllRestaurants();

        if (this.selectedFilters['category'] !== '') {
            this.restaurants=this.restaurants.filter(x=>x.category === this.selectedFilters['category']);
        }
        if (this.selectedFilters['location'] !== '') {
            this.restaurants=this.restaurants.filter(x=>x.area === this.selectedFilters['location']);
        }
        if (this.selectedFilters['cuisine'] !== '') {
            this.restaurants=this.restaurants.filter(x=>x.type === this.selectedFilters['cuisine']);
        }
        if (this.selectedFilters['sort'] !== '') {
            this.restaurants = this.restaurants.sort((a,b)=>a[this.selectedFilters['sort'].toLowerCase()]-b[this.selectedFilters['sort'].toLowerCase()]);
        }
    }



}
