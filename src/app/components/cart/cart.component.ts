import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor( public authService: AuthService, private fb: FormBuilder ) { }
  all: any = [];
  data: any;
  index: Boolean = false;

  formEpicEmail = this.fb.group({
    epic: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  });

  ngOnInit(): void {
    this.authService.dataList = this.authService.allData;
    this.data = this.authService.allData;
    var datadata = this.data.map(res => this.all = res.euro)
    this.all = this.sum(datadata);
    if(this.authService.indexBouncer > 5 && window.innerWidth > 700) {
      this.index = true;
    } else {
      this.index = false;
    }
    if(this.authService.indexBouncer < 5 && window.innerWidth < 700) {
      this.index = true;
    }
    else if(this.authService.indexBouncer > 5 && window.innerWidth < 700) {
      this.index = true;
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

  onClickPaymant(all: any, epic: string, email: string) {
    console.log("Totale euro: ", all, "Epic Id:", epic, "Email: ", email);
  }
}
