import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';

const routes: Routes = [
    { path: '', redirectTo: 'events/', pathMatch: 'full' },
    { path: 'events', redirectTo: 'events/', pathMatch: 'full' },
    { path: 'events/:eventId', component: EventComponent },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRouter {}
