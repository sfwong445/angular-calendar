import { Injectable } from '@angular/core';

import { Appointment } from './appointment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>('/appointments');
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(
      '/appointments/add',
      appointment,
      httpOptions
    );
  }

  removeAppointment(appointmentId: number): Observable<Appointment> {
    return this.http.delete<Appointment>(`/${appointmentId}/delete`);
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(
      `/appointments/${appointment.id}/update`,
      appointment,
      httpOptions
    );
  }
}
