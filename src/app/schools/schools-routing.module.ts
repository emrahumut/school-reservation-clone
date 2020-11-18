import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolsComponent } from './schools.component';
import { MapComponent } from './map/map.component';
import { ThanksPageComponent } from './thanks-page/thanks-page.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolsComponent,
    data: {
      meta: {
        title: 'home.title',
        description: 'home.text',
        override: true,
      },
    },
  },
  {
    path: 'map',
    component: MapComponent,
    data: {
      meta: {
        title: 'home.title',
        description: 'home.text',
        override: true,
      },
    },
  },
  {
    path: 'thanks',
    component: ThanksPageComponent,
    data: {
      meta: {
        title: 'home.title',
        description: 'home.text',
        override: true,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
