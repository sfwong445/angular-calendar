import { Injectable } from '@angular/core';

import { Appointment } from './appointment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getAppointments (): Observable<Appointment[]> {
    return this.http.get<Appointment[]>('http://localhost:8081/appointments')
  }

  addAppointment (appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>('http://localhost:8081/appointments/add', appointment, httpOptions)
  }
}