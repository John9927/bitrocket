import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  showOut: Boolean = false;

  constructor(private authService: AuthService) { }

  response: any = [];
  amount: any = [];


  ngOnInit(): void {
    this.getTotales();
    this.getDatas();
    if(this.authService.indexBouncer >= 1) {
      this.authService.buttonClicked = true;
    } else {
      this.authService.buttonClicked = false;
    }
  }

  getDatas() {
    return this.authService.getData().subscribe(data =>
      this.response = data.docs.map(e => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      }));
  }

  dataArray: any = [];

  //  Totale crediti che stanno nel magazzino
  getTotales() {
    this.authService.getTotale().subscribe({
      next: (res) => {
      },
      error: err => {
        console.log("error occurred")
      },
      complete: () => {
        console.log("subscription completed")
      },
    })
  }


  onClickBuy(id: any, euro: number, amount: number, image: string, nome: string) {
    if (this.authService.buttonClicked == false) {
      this.authService.allData.push({ "Id": id, "euro": euro, "crediti": amount, "image": image, "Nome": nome });
      this.authService.nomeCurrent = nome;
      this.authService.totaleData.push(euro);
      this.authService.indexBouncer++;
      this.authService.showBouncer = true;
      this.authService.showAddedCart = true;
      this.authService.buttonClicked = true;
      setTimeout(() => {
        this.authService.showAddedCart = false;
      }, 1000);
    } else {
      this.authService.showPopupErrorTwoItems = true;
      setTimeout(() => {
        this.authService.showPopupErrorTwoItems = false;
      }, 1000)
    }
  }

}


