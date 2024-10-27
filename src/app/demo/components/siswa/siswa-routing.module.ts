import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JadwalComponent } from './jadwal/jadwal.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'jadwal', component: JadwalComponent }
    ])],
    exports: [RouterModule]
})
export class SiswaRoutingModule { }
