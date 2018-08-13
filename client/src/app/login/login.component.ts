import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    Username: '',
    Password: ''
  }

  login(user: User): void {
    this.authenticationService.Login(user)
      .subscribe(user => {
        console.log(user)
      })
  }

  constructor(private authenticationService: AuthenticationService) { }



  ngOnInit() {
  }

}
