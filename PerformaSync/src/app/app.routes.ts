import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import { AjouterLettreComponent } from './front-module/ajouter-lettre/ajouter-lettre.component';
import { FindNotifMeetingsComponent } from './front-module/find-notif-meetings/find-notif-meetings.component';
import {FaceCaptureComponent} from "./face-capture/face-capture.component";
import {authGuard} from "./helper/auth.guard";

export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'front',loadChildren:()=> import('./front-module/front-module.module').then(m=>m.FrontModuleModule)},
  {path:'back',loadChildren:()=> import('./back-module/back-module.module').then(m=>m.BackModuleModule),canActivate:[authGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path: 'front/ajouter', component: AjouterLettreComponent },
  {path: 'front/notif', component: FindNotifMeetingsComponent },
  {path:'forgotpassword',component:ForgotPasswordComponent},
  {path:'resetPassword',component:ResetPasswordComponent},
  {path:'cam',component:FaceCaptureComponent},
  {path:'**',component:NotFoundComponent}
];
