import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home/dashboard'] }
                ]
            },
            {
                label: 'Siswa',
                items: [
                    { label: 'Jadwal', icon: 'pi pi-fw pi-calendar', routerLink: ['/home/siswa/jadwal'] },
                    { label: 'Raport', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/input'] },
                ]
            },
            {
                label: 'Guru',
                items: [
                    { label: 'Daftar Siswa', icon: 'pi pi-fw pi-users', routerLink: ['/uikit/formlayout'] },
                    { label: 'Managemen Jadwal', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/input'] },
                    { label: 'Set Informasi', icon: 'pi pi-fw pi-info-circle', routerLink: ['/uikit/input'] },
                ]
            },
        ];
    }
}
