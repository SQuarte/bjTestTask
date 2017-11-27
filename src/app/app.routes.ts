import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NoContentComponent} from "./components/no-content/no-content.component";
import {LoginComponent} from "./components/login/login.component";

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: '**',    component: NoContentComponent },
];
