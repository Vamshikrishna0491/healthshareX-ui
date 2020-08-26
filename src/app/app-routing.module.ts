import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
   {path:'', redirectTo:'landing', pathMatch: 'full'},
   { path: 'landing', loadChildren: () => import('src/app/landing/landing.module').then(m => m.LandingModule) },
   { path: 'licences', loadChildren: () => import('src/app/licences/licences.module').then(m => m.LicencesModule) },
   { path: 'login', loadChildren: './login/login.module#LoginModule'},
   { path: '**', redirectTo: 'not-found' },

];

@NgModule({
   imports: [RouterModule.forRoot(routes),HttpClientModule],
   exports: [RouterModule]
})
export class AppRoutingModule {}
