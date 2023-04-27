import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnothercityComponent } from './anothercity/anothercity.component';
import { TodayComponent } from './today/today.component';

const routes: Routes = [
 
  {
    path: ':slug',
    component: TodayComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
