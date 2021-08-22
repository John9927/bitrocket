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
  dataList: any = [];
  all: any = [];

  ngOnInit(): void {
    this.dataList = this.authService.allData;
    var data = this.authService.allData;
    var datadata = data.map(res => this.all = res.euro)
    this.all = this.sum(datadata);
  }

  onClickRemoveItems(id: any) {
    console.log(id)
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
