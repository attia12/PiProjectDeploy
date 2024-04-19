import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BackComponent} from "./back.component";
import {AdminComponent} from "./admin/admin.component";
import {ProfilComponent} from "./profil/profil.component";
import {ChatComponent} from "./chat/chat.component";
import {CreateRoomComponent} from "./create-room/create-room.component";
import {ListUserComponent} from "./list-user/list-user.component";
import { AfficherLettresComponent } from './afficher-lettres/afficher-lettres.component';
import {authGuard} from "../helper/auth.guard";


const routes: Routes = [
  {path:'',component:BackComponent,children: [
      {path:'admin',component:AdminComponent},
      {path:'profil/:id',component:ProfilComponent},
      {path:'chat',component:ChatComponent},
      {path:'createRoom',component:CreateRoomComponent},
      {path:'users',component:ListUserComponent},
      {path:"afficher",component:AfficherLettresComponent}
    ]

    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackModuleRoutingModule { }
