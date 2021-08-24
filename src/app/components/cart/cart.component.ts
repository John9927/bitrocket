import { FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { trigger } from '@angular/animations';
// import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

declare var paypal;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // public payPalConfig?: IPayPalConfig;

  constructor(public authService: AuthService, private fb: FormBuilder) { }

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  paidFor = false;
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
    if (this.authService.indexBouncer > 5 && window.innerWidth > 700) {
      this.index = true;
    } else {
      this.index = false;
    }
    if (this.authService.indexBouncer < 5 && window.innerWidth < 700) {
      this.index = true;
    }
    else if (this.authService.indexBouncer > 5 && window.innerWidth < 700) {
      this.index = true;
    }

    // PAYPAL
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.authService.nomeCurrent,
                amount: {
                  value: this.all
                }
              }
            ]
          });
        },
        style: {
          layout: 'horizontal',
          fundingicons: 'true',
          style: 'responsive',
          color: 'blue',
          shape: 'pill',
          label: 'pay',
          height: 40,
        },
        funding: {
          allowed: [paypal.FUNDING.CREDIT]
        },
        allowed: [ paypal.FUNDING.CREDIT ],
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          var time = order.update_time;
          var id = order.id;
          var email_address = order.payer.email_address;
          var given_mame = order.payer.name.given_name;
          var surname = order.payer.name.surname;
          var purchase_units = order.purchase_units;
          var status = order.status;
          this.paidFor = true;
          this.authService.addData({'id': id, 'time': time, 'name': given_mame, 'surname': surname, 'email_paypal': email_address, 'purchase_units': purchase_units, 'status': status, 'Oggetti Ordinati': this.authService.allData ,'idEpic': this.formEpicEmail.controls.epic.value, 'Email': this.formEpicEmail.controls.email.value});

        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
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

  sum(obj: any = []) {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  }

  onClickPaymant(all: any, epic: string, email: string) {
    console.log("Totale euro: ", all, "Epic Id:", epic, "Email: ", email);
  }
}
