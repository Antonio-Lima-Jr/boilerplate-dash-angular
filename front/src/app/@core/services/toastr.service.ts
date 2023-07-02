import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private nbToastrService: NbToastrService) {}

  errorServidor(e) {
    this.nbToastrService.show(
      '',
      'Server problem, contact support!',
      {
        status: 'warning',
      }
    );
  }

  success(msg: string) {
    this.nbToastrService.show('success', msg, {
      status: 'success',
    });
  }
}
