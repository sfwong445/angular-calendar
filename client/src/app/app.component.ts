import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import * as fromAuth from "./auth/reducers";
import * as Auth from './auth/actions/auth-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: boolean;

  logout() {
    this.store.dispatch(new Auth.Logout());
    this.router.navigateByUrl('/home')
  }

  constructor(
    private store: Store<fromAuth.AuthState>,
    private router: Router
  ) {
    this.store.pipe(select(fromAuth.getLoggedIn))
      .subscribe(value => {
        this.isLoggedIn = value
      })
   }
}
