import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showHamburger: Boolean = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickButton() {
    this.showHamburger = !this.showHamburger;
  }

  onClickButton2() {
    this.showHamburger = !this.showHamburger;
  }

  onClickHamburger() {
    this.showHamburger = !this.showHamburger;
  }

}
