import { Router } from '@angular/router';
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
  constructor(public authService: AuthService, private fb: FormBuilder, public router: Router) { }

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  data: any;
  index: Boolean = false;
  disabledPaypal: Boolean = false;

  formEpicEmail = this.fb.group({
    epic: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  });

  ngOnInit(): void {
    setInterval(() => {
      if(this.formEpicEmail.valid) {
        this.disabledPaypal = true;
      } else {
        this.disabledPaypal = false;
      }
    }, 500);

    this.authService.dataList = this.authService.allData;
    this.data = this.authService.allData;
    var datadata = this.data.map(res => this.authService.all = res.euro)
    this.authService.all = this.sum(datadata);
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
    setTimeout(() => {
      this.authService.showPopupCartMobile = false;
    }, 10)


    // PAYPAL
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.authService.nomeCurrent,
                amount: {
                  value: this.authService.all
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
          this.authService.idPayment = order.id;
          var email_address = order.payer.email_address;
          var given_mame = order.payer.name.given_name;
          var surname = order.payer.name.surname;
          var purchase_units = order.purchase_units;
          var status = order.status;
          var totaleCrediti = this.authService.all;
          this.authService.addData({'id': id, 'time': time, 'name': given_mame, 'surname': surname, 'email_paypal': email_address, 'purchase_units': purchase_units, 'status': status, 'oggetti_ordinati': this.authService.allData ,'idEpic': this.formEpicEmail.controls.epic.value, 'Email': this.formEpicEmail.controls.email.value, 'totale_crediti': totaleCrediti});
          this.authService.indexBouncer = 0; //Reset index
          this.authService.allData = []; // Reset Data
          console.log("sono il datalist", this.authService.dataList)
          this.authService.paymentSuccessAcceptedGuard = true;
          this.router.navigateByUrl('payment-accepted');

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
    var datadata = this.data.map(res => this.authService.all = res.euro)
    this.authService.all = this.sum(datadata);
    this.authService.indexBouncer--;

    if(this.authService.indexBouncer == 0) {
      this.authService.buttonClicked = true;
    }
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
