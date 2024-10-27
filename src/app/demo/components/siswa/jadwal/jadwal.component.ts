import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MessageService } from 'primeng/api';
import { GoogleCalendarService } from 'src/app/demo/service/google-calendar.service';


@Component({
  selector: 'app-jadwal',
  templateUrl: './jadwal.component.html',
  styleUrl: './jadwal.component.scss'
})
export class JadwalComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'Gambyong Semarang', date: '2024-10-01' },
      { title: 'Tari Kecak', date: '2024-10-02' }
    ]
  };

  constructor(
    private googleCalendarService: GoogleCalendarService,
    public message: MessageService
  ) { }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  createEvent() {
    const event = {
      summary: 'Pengingat Acara',
      location: 'Alamat Acara',
      description: 'Deskripsi acara.',
      start: {
        dateTime: '2024-11-01T09:00:00-07:00', // Waktu mulai acara
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2024-11-01T17:00:00-07:00', // Waktu akhir acara
        timeZone: 'America/Los_Angeles',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // Pengingat email sehari sebelumnya
          { method: 'popup', minutes: 10 }, // Pengingat popup 10 menit sebelumnya
        ],
      },
    };

    this.googleCalendarService.addEvent(event).then(response => {
      console.log('Acara berhasil ditambahkan:', response);
    }).catch(error => {
      console.error('Gagal menambahkan acara:', error);
    });
  }



}
