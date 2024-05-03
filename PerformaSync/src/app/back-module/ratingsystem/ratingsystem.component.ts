import { Component, Input } from '@angular/core';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-ratingsystem',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './ratingsystem.component.html',
  styleUrl: './ratingsystem.component.css'
})
export class RatingsystemComponent {
  faStar=faStar
  @Input() rating:number=0;
  @Input() readonly:boolean=true;

  setRating(value:number){
    if(this.readonly)
    return null;
    else  this.rating=value;
  }

}
