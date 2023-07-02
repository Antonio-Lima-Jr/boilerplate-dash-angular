import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';
import { NewsComponent } from './news/news.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'overview', // http://localhost:8001/dashboard/overview
    component: OverviewComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '', // http://localhost:8001/dashboard
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
