import {Component, OnInit} from '@angular/core';

import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";


declare const $: any;
declare interface RouteInfo {

  path: string;
  roles: Array<string>;
  title: string;
  icon: string;
  class?: string;
  isVisible?: boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: '/back', roles:['superadmin'],title: 'Dashboard',  icon: 'dashboard', class: '',isVisible:true },
  { path: '/back/profil',roles:['admin','superadmin','employee'], title: 'User Profile',  icon:'person', class: '' ,isVisible:true},
  { path: '/back/afficher',roles:['admin','superadmin'], title: 'Lettres de motivations',  icon:'library_books', class: '' ,isVisible:true},
  { path: '/back/chat',roles:['admin','superadmin','employee'], title: 'Chat',  icon:'content_paste', class: '' ,isVisible:true},
  { path: '/evalution', roles:['employee'],title: 'Evaluation',  icon:'library_books', class: '' ,isVisible:true},
  { path: '/icons', roles:[''],title: 'Icons',  icon:'bubble_chart', class: '' },
  { path: '/maps', roles:[''],title: 'Maps',  icon:'location_on', class: '',isVisible:true },
  { path: '/notifications',roles:[''], title: 'Notifications',  icon:'notifications', class: '',isVisible:true },
  { path: '/upgrade', roles:[''],title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro',isVisible:true },
  { path: '/back/users', roles:['superadmin'], title: 'User List', icon:'group', class: '', isVisible:true },
  { path: '/back/ListTimeEntries', roles:['admin','superadmin'],title: 'List TimeEntries',  icon:'library_books', class: '' ,isVisible:true},
  { path: '/back/ListEvaluation', roles:['admin','superadmin'],title: 'List Evaluation',  icon:'library_books', class: '' ,isVisible:true},
  { path: '/back/EmployeeDashboard', roles:['employee'],title: 'Pointage',  icon:'library_books', class: '' ,isVisible:true},
  { path: '/back/EmployeeEntryList', roles:['company'],title: 'List Employee Pointage',  icon:'library_books', class: '' ,isVisible:true},
  { path: '/back/mission', roles:['company'],title: 'List Mission',  icon:'library_books', class: '' ,isVisible:true},
  { path: '/back/trackingmisssion', roles:['employee'],title: 'Missions Available',  icon:'library_books', class: '' ,isVisible:true},
  { path: '/back/meets', roles:['admin','superadmin'],title: 'Meets',  icon:'library_books', class: '' ,isVisible:true},
  { path: '/back/meetEmployee', roles:['employee'],title: 'Meets',  icon:'library_books', class: '' ,isVisible:true},
  { path: '/back/listConge', roles:['admin','superadmin'],title: 'Congee',  icon:'library_books', class: '' ,isVisible:true},
  { path: '/back/addConge', roles:['admin','superadmin'],title: 'Add Congee',  icon:'library_books', class: '' ,isVisible:true},
  
  

];
interface Route {
  roles: Array<string>;
  link: string;
  icon: string;
  label: string;
  groupe: string;
  name: string;
  isVisible: boolean;
}
@Component({
  selector: 'app-back',


  templateUrl: './back.component.html',
  styleUrl: './back.component.css'
})
export class BackComponent implements OnInit{
  user: any;
  menuItems: any=[];
    test : Date = new Date();
  isAuthenticated: boolean=false;








  constructor(public userService: UserService,private router:Router) {

  }


  logout() {


    this.userService.logout().subscribe(() => {
      
      this.router.navigate(['/login']);
    }, error => {
      console.log("logout fail", error);
    });

  }

  getTitle() {

  }



  sidebarToggle() {

  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.userService.userRoles$.subscribe(roles => {
      if (roles && roles.length > 0) {
        // Filter menu items based on user's roles and visibility
        this.menuItems = ROUTES.filter(menuItem =>
          menuItem.isVisible && menuItem.roles.some(role => roles.includes(role))
        );
      }
    });
    this.userService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });


  }
  ngOnDestroy() {

  }


  getUserId() {
    return this.userService.getUserIdFromToken();
  }
}
