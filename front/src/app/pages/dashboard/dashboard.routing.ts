import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { OverviewComponent } from './overview/overview.component';

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
    path: '', // http://localhost:8001/dashboard
    redirectTo: 'overview',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
