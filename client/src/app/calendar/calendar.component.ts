import { Component, OnInit, Inject } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Appointment } from '../appointment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  };

  appointments: Appointment[];
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  constructor(
    private calendarService: CalendarService,
    public dialog: MatDialog
  ) {}

  GetAppointments(): void {
    this.calendarService.getAppointments().subscribe(appointments => {
      this.appointments = appointments;
      this.appointments = this.appointments.map(appointment => {
        let appointmentWithDateType: Appointment = {
          id: 0,
          title: '',
          date: new Date('')
        };
        appointmentWithDateType.title = appointment.title;
        appointmentWithDateType.date = new Date(appointment.date);
        appointmentWithDateType.id = appointment.id;
        return appointmentWithDateType;
      });
    });
  }

  AddAppointment(appointment: Appointment): void {
    this.calendarService
      .addAppointment(appointment)
      .subscribe(() => this.GetAppointments());
  }

  DeleteAppointment(appointmentId: number): void {
    const id = appointmentId;
    this.calendarService.removeAppointment(id).subscribe(() => {
      this.GetAppointments();
    });
  }

  openDialog(appointment: Appointment): void {
    const dialogRef = this.dialog.open(AppointmentOverviewDialog, {
      width: '270px',
      data: {
        id: appointment.id,
        title: appointment.title,
        date: appointment.date
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.calendarService.updateAppointment(result).subscribe(() => {
        this.GetAppointments();
      });
    });
  }

  ngOnInit() {
    this.GetAppointments();
  }
}

@Component({
  selector: 'calendar-dialog',
  templateUrl: 'calendar-dialog.html'
})
export class AppointmentOverviewDialog {
  constructor(
    public dialogRef: MatDialogRef<AppointmentOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
