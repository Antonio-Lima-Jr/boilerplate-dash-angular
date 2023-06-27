import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <a href="#" target="_blank" class="ion ion-social-github"></a>
    <a href="#" target="_blank" class="ion ion-social-facebook"></a>
    <a href="#" target="_blank" class="ion ion-social-twitter"></a>
    <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
  `,
})
export class FooterComponent {}
