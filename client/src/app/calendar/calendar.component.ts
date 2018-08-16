import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  appointment: Appointment = {
    id: 0,
    title: '',
    date: new Date(Date.now())
  }

  appointments: Appointment[];
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  constructor(private calendarService: CalendarService) { }

  GetAppointments(): void {
    this.calendarService.getAppointments()
      .subscribe((appointments) => {
        this.appointments = appointments;
        this.appointments = this.appointments.map( appointment => {
          let appointmentWithDateType: Appointment = {
            id: 0,
            title: '',
            date: new Date('')
          };
          appointmentWithDateType.title = appointment.title;
          appointmentWithDateType.date = new Date(appointment.date)
          appointmentWithDateType.id = appointment.id;
          return appointmentWithDateType
        })
      })
  }

  AddAppointment(appointment: Appointment): void {
    this.calendarService.addAppointment(appointment)
      .subscribe(() => this.GetAppointments())
  }

  DeleteAppointment(appointmentId: number): void {
    const id = appointmentId;
    this.calendarService.removeAppointment(id)
      .subscribe(() => {
        this.GetAppointments()
      })
  }

  ngOnInit() {
    this.GetAppointments();
  }

}
