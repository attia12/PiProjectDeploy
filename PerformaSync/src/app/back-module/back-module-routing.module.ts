import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BackComponent} from "./back.component";
import {AdminComponent} from "./admin/admin.component";
import {ProfilComponent} from "./profil/profil.component";
import {ChatComponent} from "./chat/chat.component";
import {CreateRoomComponent} from "./create-room/create-room.component";
import {ListUserComponent} from "./list-user/list-user.component";
import { AfficherLettresComponent } from './afficher-lettres/afficher-lettres.component';
import { ListTimeEntriesComponent } from './list-time-entries/list-time-entries.component';
import { ListEvaluationEmployeeComponent } from './list-evaluation-employee/list-evaluation-employee.component';
import { ListEvaluationComponent } from './list-evaluation/list-evaluation.component';
import { AjoutEvaluationComponent } from './ajout-evaluation/ajout-evaluation.component';
import { ModifierEvaluationComponent } from './modifier-evaluation/modifier-evaluation.component';
import { ModifierTimeEntryComponent } from './modifier-time-entry/modifier-time-entry.component';
import { AjoutTimeEntryComponent } from './ajout-time-entry/ajout-time-entry.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeePointageListComponent } from './employee-pointage-list/employee-pointage-list.component';
import { MissionCompanyComponent } from './mission-company/mission-company.component';
import { EmployeeTrackingMisssionComponent } from './employee-tracking-misssion/employee-tracking-misssion.component';
import { MeetsComponent } from './meets/meets.component';
import { SendcontractComponent } from './sendcontract/sendcontract.component';
import { EmployeeMeetinsComponent } from './employee-meetins/employee-meetins.component';
import { CongeListComponent } from './conge-list/conge-list.component';
import { AddCongeComponent } from './add-conge/add-conge.component';
import { CongeModifyComponent } from './conge-modify/conge-modify.component';



const routes: Routes = [
  {path:'',component:BackComponent,children: [
      {path:'admin',component:AdminComponent},
      {path:'profil/:id',component:ProfilComponent},
      {path:'chat',component:ChatComponent},
      {path:'createRoom',component:CreateRoomComponent},
      {path:'users',component:ListUserComponent},
      {path:"afficher",component:AfficherLettresComponent},
       {path:'ListEvaluation',component:ListEvaluationComponent},
      {path:'ListTimeEntries',component:ListTimeEntriesComponent},
      {path:'EmployeeEvaluation/:employee',component:ListEvaluationEmployeeComponent},
      {path:'AjoutEvaluation/:id',component:AjoutEvaluationComponent},
      {path:'AjoutTimeEntry',component:AjoutTimeEntryComponent},
      {path:'ModifierEvaluation/:id',component:ModifierEvaluationComponent},
      {path:'ModifierTimeEntry/:id',component:ModifierTimeEntryComponent},
      {path:'EmployeeDashboard',component:EmployeeDashboardComponent},
      {path:'EmployeeEntryList',component:EmployeePointageListComponent},
      {path:'mission',component:MissionCompanyComponent},
      {path:'trackingmisssion',component:EmployeeTrackingMisssionComponent},
      {path:'meets',component:MeetsComponent},
      {path:'sign',component:SendcontractComponent},
      {path:'meetEmployee',component:EmployeeMeetinsComponent},
      {path:'listConge',component:CongeListComponent},
      {path:'addConge',component:AddCongeComponent},
      {path:'modifyConge/:id',component:CongeModifyComponent},

    ]

    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackModuleRoutingModule { }
