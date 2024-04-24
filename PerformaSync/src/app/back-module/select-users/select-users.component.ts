import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserI } from '../user.interface';
import { MatError, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {  debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';

import {MatIcon} from "@angular/material/icon";




@Component({
  selector: 'app-select-users',
  standalone: true,
  imports: [
    CommonModule,


    MatInputModule,
    MatOptionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconButton,
    MatError,
    MatAutocompleteModule,
    MatChipsModule,
    MatIcon,
    MatButton,

  ],
  templateUrl: './select-users.component.html',
  styleUrl: './select-users.component.css'
})
export class SelectUsersComponent implements OnInit {
  @Input() users: UserI[] = [];
  @Output() addUser: EventEmitter<UserI> = new EventEmitter<UserI>();
  @Output() removeuser: EventEmitter<UserI>= new EventEmitter<UserI>();
  searchUsername = new FormControl();
  filteredUsers: UserI[] = [];
  selectedUser: UserI=null;
  constructor(private userService:UserService)
  {

  }
  ngOnInit(): void {
    this.searchUsername.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((username: string) => this.userService.findByUsername(username).pipe(
        tap((users: UserI[]) => this.filteredUsers = users)
      ))
    ).subscribe();
  }
  displayfn(user:any)
  {
    if(user)
      {
        return user.username;
      } else {
        return '';
      }
  }
  addUserToForm() {
    this.addUser.emit(this.selectedUser);
    this.filteredUsers=[];
    this.selectedUser=null;
    this.searchUsername.setValue(null);

  }
  setSelectedUser( user:UserI)
  {
    this.selectedUser=user;

  }
  removeUserFromForm(user: UserI)
  {
    this.removeuser.emit(user);

  }

}
