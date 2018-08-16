import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { User } from "../user";
import { Authenticate } from "../auth/models/User";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromAuth from "../auth/reducers";
import * as Auth from "../auth/actions/auth-action";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  error$: boolean
  user: User = {
    Username: "",
    Password: ""
  };
  
  returnedUser: Authenticate = {
    user: this.user,
    token: ""
  };

  login(user: User): void {
    this.authenticationService.Login(user).subscribe(userReturned => {
      if (typeof(userReturned) !== "string") {
        Object.assign(this.returnedUser, userReturned);
        this.store.dispatch(new Auth.Login(this.returnedUser));
        this.router.navigateByUrl("/home");
      } else {
        this.error$ = true;
      }
    })
  }

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromAuth.AuthState>,
    private router: Router
  ) {}

  ngOnInit() {}
}
