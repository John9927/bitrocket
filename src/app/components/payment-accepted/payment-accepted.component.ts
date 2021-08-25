import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment-accepted',
  templateUrl: './payment-accepted.component.html',
  styleUrls: ['./payment-accepted.component.scss']
})
export class PaymentAcceptedComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.authService.showPopupCartMobile = false;
    }, 10)
  }

}
