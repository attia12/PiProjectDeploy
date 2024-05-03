import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackModuleRoutingModule } from './back-module-routing.module';
import {MatMenu} from "@angular/material/menu";
import {BackComponent} from "./back.component";
import {MatButton} from "@angular/material/button";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {ChatService} from "./chat/chat.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import { environment } from '../../environments/environment.development';

export function tokenGetter()
{
  const token = localStorage.getItem("access_token");
  return token ? token : '';
}

const config: SocketIoConfig = { url: `${environment.baseUrl}`, options: {
  extraHeaders:{
    Authorization:tokenGetter()
  }
  } };





@NgModule({
  declarations: [
    BackComponent,


  ],
  imports: [
    CommonModule,
    BackModuleRoutingModule,
    SocketIoModule.forRoot(config),
   
    


    MatMenu,
    MatButton,
    MatPaginatorModule

  ],
  providers:[ChatService]
})
export class BackModuleModule { }
