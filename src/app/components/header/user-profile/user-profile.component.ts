
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../security/login/login.model';
import { LoginService } from '../../security/login/login.service';

@Component({
  selector: 'lacc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User
  isEdit: boolean;
  userEdited: { name: string, email: string };

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getUserData();

  }

  getUserData() {
    this.loginService.getUserData().subscribe(user => {
      this.user = user;
      this.userEdited = { "name": this.user.userName, "email": this.user.userEmail };
    },
    err=> {
      console.log("Cannot find user details. Please login again")
    },
    ()=> console.log('Got user details'))
  }


  updateProfile() {
    this.loginService.updateUser(this.userEdited).subscribe(response => {
      this.isEdit = false;
      this.getUserData();
      this.loginService.user.userName = this.userEdited.name;
    },
    err=> console.log("Error in updating profile, try a different name or email."))
  }

 


}
