import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { EventComponent } from './event/event.component';

export const rootRoute = (route: ActivatedRoute): ActivatedRoute => {
  while (route.firstChild) {
    route = route.firstChild;
  }
  return route;
};

const routes: Routes = [
  {
    path: 'event',
    component: EventComponent,
    children: [{ path: ':eventId', component: EventComponent }],
  },
  { path: '', component: EventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouter {}
