import {inject, Injectable} from '@angular/core';
import { ToastrService} from "ngx-toastr";





@Injectable({
  providedIn: 'root',

})
export class ToastService {

  private toastr = inject(ToastrService);

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showError(message: string) {
    this.toastr.error(message);
  }
}
