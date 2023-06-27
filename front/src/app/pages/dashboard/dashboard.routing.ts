import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { NewsComponent } from "./news/news.component";
import { OverviewComponent } from "./overview/overview.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: "overview", // http://localhost:4200/dashboard/overview
    component: OverviewComponent,
  },
  {
    path: "news", // http://localhost:4200/dashboard/news
    component: NewsComponent,
  },
  {
    path: "settings", // http://localhost:4200/dashboard/settings
    component: SettingsComponent,
  },
  {
    path: "profile", // http://localhost:4200/dashboard/profile
    component: ProfileComponent,
  },
  {
    path: "", // http://localhost:4200/pages
    redirectTo: "overview",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
