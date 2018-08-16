import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { User } from "../user";
import { Authenticate } from "../auth/models/User";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromAuth from "../auth/reducers";
import * as Auth from "../auth/actions/auth-action";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  error$: boolean;
  user: User = {
    Username: "",
    Password: ""
  };
  returnedUser: Authenticate = {
    user: this.user,
    token: ""
  };

  register(newUser: User): void {
    this.authenticationService.Register(newUser).subscribe(userReturned => {
      Object.assign(this.returnedUser, userReturned);
      this.store.dispatch(new Auth.Login(this.returnedUser));
      this.router.navigateByUrl("/home");
    });
  }

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromAuth.AuthState>,
    private router: Router
  ) {}

  ngOnInit() {}
}
