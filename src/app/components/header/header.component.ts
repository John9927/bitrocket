import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showHamburger: Boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  onClickButton() {

  }

  onClickButton2() {

  }

  onClickHamburger() {
    this.showHamburger = !this.showHamburger
  }

}
