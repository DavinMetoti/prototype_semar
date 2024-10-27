import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiswaRoutingModule } from './siswa-routing.module';
import { JadwalComponent } from './jadwal/jadwal.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';






@NgModule({
  declarations: [
    JadwalComponent
  ],
  imports: [
    CommonModule,
    SiswaRoutingModule,
    FullCalendarModule,
    TabViewModule,
    ButtonModule,
    MessagesModule,
    TagModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class SiswaModule { }
