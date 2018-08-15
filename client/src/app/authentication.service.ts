import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./user";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  Register(user: User): Observable<User> {
    return this.http.post<User>(
      "http://localhost:8081/register",
      user,
      httpOptions
    );
  }

  Login(user: User): Observable<User|string> {
    return this.http.post<User>(
      "http://localhost:8081/login",
      user,
      httpOptions
    ).pipe(
      catchError(error => of('An error occured logging in'))
    );
  }
}
