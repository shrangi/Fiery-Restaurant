import { inject,TestBed } from "@angular/core/testing"
import { LoginService } from "./login.service"
import { RESTAURANT_API } from "../../../app.constants"
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { environment } from "../../../../environments/environment";
import { FormsModule } from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import { LoginComponent } from "./login.component";
import { InputComponent } from "../../shared/input/input.component";


describe('Login Service', ()=>{

    let service: LoginService;
    let httpMock: HttpTestingController;

    beforeEach(()=>{
       TestBed.configureTestingModule({
        providers: [LoginService],
        declarations:[LoginComponent, InputComponent],
        imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([{path: 'login', component: LoginComponent}])],
       });

       service = TestBed.get(LoginService);
       httpMock = TestBed.get(HttpTestingController);
    });

    
    afterEach(()=>{
        httpMock.verify();
    })

    it('should create the Login Service', inject(    
        [LoginService], (service: LoginService) => {
        expect(service).toBeTruthy();
      }));

    it('should accept all the necessary information for sign up via post method', ()=>{
       
        const dummyRes = 
            {
                "_id":1,
                "userName": "Jessy",
                "userEmail": "jessy@gmail.com",
                "userPassword": "123456",
                "isRestaurant": "false",
                "userGender": "female",
                "userAge": 23,
                "userCity": "Bangalore",
                "userCountry": "India"
                
            }
            
            service.signUp( dummyRes.userName, dummyRes.userEmail, dummyRes.userPassword, dummyRes.userCity, dummyRes.userCountry).subscribe(res=>{
        
            expect(res).toEqual(dummyRes)
        })
        
        const req = httpMock.expectOne(`${RESTAURANT_API}/api/v1/auth/register`)
        expect(req.request.method).toEqual('POST');
        req.flush(dummyRes); 

    });

    
})

