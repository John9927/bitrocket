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
        console.log(res[0])
      },
      error: err => {
        console.log("error occurred")
      },
      complete: () => {
        console.log("subscription completed")
      },
    })
  }


  onClickBuy(id: any, euro: number, amount: number, image: string) {
    this.authService.allData.push({"Id": id, "euro": euro, "crediti": amount, "image": image });
    this.authService.totaleData.push(euro);
    this.authService.indexBouncer++;
    this.authService.showBouncer = true;
    this.authService.showAddedCart = true;

    setTimeout(() => {
      this.authService.showAddedCart = false;
    }, 1000)
  }

}


