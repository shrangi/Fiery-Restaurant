import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed,inject } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "../../shared/input/input.component";
import { LoginComponent } from "./login.component"
import { LoginService } from "./login.service";

import { RouterTestingModule } from "@angular/router/testing";
import { NotificationService } from "../../shared/messages/notification.service";
import { RestaurantComponent } from "../../restaurants/restaurant/restaurant.component";

describe('Login component',()=>{
let component : LoginComponent;
let fixture :ComponentFixture<LoginComponent>;

beforeEach(async(() => { 
    TestBed.configureTestingModule({
        imports: [ReactiveFormsModule,
             FormsModule,
             HttpClientTestingModule, 
             RouterTestingModule.withRoutes([{path: '', component: LoginComponent }])],
    
      declarations: [
        LoginComponent,InputComponent,
      ],

      providers:[LoginService, NotificationService]
      
    }).compileComponents();

  }));

  beforeEach(()=>{
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  })

  it('should create login component',()=>{
      expect(component).toBeTruthy();
  });


  //by Nikita
  it('should not show loader on component init',()=>{
    expect(component.isLoggedIn).toBe(true);
  });

  it('should create login function',()=>{
    expect(component.login).toBeTruthy();
  });

  // it('should email id contain @ symbol',
  //   inject([LoginComponent], (service:LoginComponent)=>{
  //   expect(service.login).toMatch("@");
  // }));

  // it('should fullname does not match with special character',
  //   inject([LoginComponent], (service:LoginComponent)=>{
  //   expect(service.login).not.toMatch("@","$");
  // }));

  // it ('should contain default value for the loginform', () =>{
  //   component.loginForm.setValue({email: '', password: ''});
  //   expect(component.loginForm.value).toContain({email: '', password: ''});
    

  // })

  

})