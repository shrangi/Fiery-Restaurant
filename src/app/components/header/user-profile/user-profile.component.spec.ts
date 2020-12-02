import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../security/login/login.service';

import { UserProfileComponent } from './user-profile.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from '../../shared/messages/notification.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [LoginService, NotificationService ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;

    fixture.autoDetectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user edit option should be disabled by default', ()=>{
    fixture.detectChanges();
    expect(component.isEdit).toBeFalsy();
  })

  // it('user can edit profile after clicking on edit option', ()=>{
  //   fixture.detectChanges();
  //   let button = fixture.debugElement.nativeElement.querySelector('.glyphicon-pencil');
  //   button.click();

  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(component.isEdit).toBeTruthy();
  //   });
   
  })
});
