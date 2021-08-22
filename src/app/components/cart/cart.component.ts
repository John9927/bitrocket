import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor( public authService: AuthService ) { }
  all: any = [];
  data: any;
  index: Boolean = false;

  ngOnInit(): void {
    this.authService.dataList = this.authService.allData;
    this.data = this.authService.allData;
    var datadata = this.data.map(res => this.all = res.euro)
    this.all = this.sum(datadata);
    console.log(window.innerWidth)
    if(this.authService.indexBouncer > 5 && window.innerWidth > 1024) {
      this.index = true;
    } else {
      this.index = false;
    }
  }

  // Remove Items
  onClickRemoveItems(id: any) {
    this.authService.dataList = this.authService.dataList.filter((item: any) => item.Id !== id);
    this.authService.allData = this.authService.dataList;
    this.data = this.authService.allData;
    var datadata = this.data.map(res => this.all = res.euro)
    this.all = this.sum(datadata);
    this.authService.indexBouncer--;
  }

  sum( obj: any = [] ) {
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el] );
      }
    }
    return sum;
  }



}
