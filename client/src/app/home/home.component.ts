import { Component, OnInit } from '@angular/core';
import { Store, select } from "../../../node_modules/@ngrx/store";
import { Observable } from "rxjs";
import * as fromAuth from "../auth/reducers";
import * as Auth from "../auth/actions/auth-action";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn$: Observable<boolean>
  constructor(private store: Store<fromAuth.AuthState>) { }

  ngOnInit() {
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn))
  }

}
