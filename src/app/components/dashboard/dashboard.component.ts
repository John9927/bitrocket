import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService) { }

  showPopupSecond: Boolean = false;
  showPopupThird: Boolean = false;
  showPopupFourth: Boolean = false;
  closeDefinitivamente: any = false;
  body: any;

  ngOnInit(): void {
    if(localStorage.getItem('closeDefinitivamente')) {
      this.authService.showPopupFirst = false;
    } else {
      this.authService.showPopupFirst = true;
    }

    this.body = document.body;
    if(this.authService.showPopupFirst) {
      this.body.style.overflow = "hidden";
    }
  }

  onClickRigthFirst() {
    this.authService.showPopupFirst = false;
    this.showPopupSecond = true;
  }

  onClickClose() {
    this.authService.showPopupFirst = false;
    this.showPopupSecond = false;
    this.showPopupThird = false;
    this.showPopupFourth = false;
    this.closeDefinitivamente = true;
    localStorage.getItem('closeDefinitivamente');
    localStorage.setItem('closeDefinitivamente', this.closeDefinitivamente);
    this.body.style.overflow = "auto";
  }

  onClickLeftSecond() {
    this.authService.showPopupFirst = true;
    this.showPopupSecond = false;
  }

  onClickRigthSecond() {
    this.showPopupThird = true;
    this.showPopupSecond = false;
  }

  onClickLeftThird() {
    this.showPopupThird = false;
    this.showPopupSecond = true;
  }

  onClickRigthThird() {
    this.showPopupFourth = true;
    this.showPopupThird = false;
  }

  onClickLeftFourth() {
    this.showPopupThird = true;
    this.showPopupFourth = false;
  }

}
