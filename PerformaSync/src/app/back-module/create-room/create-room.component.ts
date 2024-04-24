import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {UserI} from "../user.interface";
import {ChatService} from "../chat/chat.service";
import {SelectUsersComponent} from "../select-users/select-users.component";

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [
    RouterLink,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatHint,
    ReactiveFormsModule,
    MatInput,
    NgIf,
    MatButton,
    SelectUsersComponent,
    MatError
  ],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent implements OnInit{
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    users: new FormArray([], [Validators.required])
  });
  constructor(private chatService: ChatService, private router: Router, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
  }


  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get users(): FormArray {
    return this.form.get('users') as FormArray;
  }
  create() {
    if (this.form.valid) {
      console.log("this is the form of the created romm",this.form.getRawValue());
      this.chatService.createRoom(this.form.getRawValue());
      this.router.navigate(['../chat'], { relativeTo: this.activatedRoute });
    }
  }

  initUser(user: UserI) {
    return new FormControl({
      _id: user._id,
      username: user.username,
      email: user.email
    });
  }

  addUser(userFormControl: FormControl) {
    this.users.push(userFormControl);
  }

  removeUser(userId: string) {
    this.users.removeAt(this.users.value.findIndex((user: UserI) => user._id === userId));
  }
}
