import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicencesComponent } from './licences.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LicencesComponent }]),
  ],
  declarations: [LicencesComponent]
})
export class LicencesModule { }
