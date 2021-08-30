import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  response: any;
  responseById: any = [];
  responsegetDataById: string | any;
  responseNumOrdine: string | any;
  responseEmail: string | any;
  responseOggetti: any = [];
  responseData: any = [];
  totaleCrediti: any;
  showObject: any;
  showInfoOrdine: Boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.getOrdini();
  }

  getOrdini() {
    return this.authService.getDataOrdini().subscribe(data =>
      this.response = data.docs.map(e => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      }));
  }

  onClickResponse(ID: any) {
    this.showInfoOrdine = true;
    return this.authService.getOrdiniById(ID).subscribe(datas => {
      this.responsegetDataById = datas[0];
      this.assignmentVariableByResponseId();
    });
  }

  assignmentVariableByResponseId() {
    this.responseById = this.responsegetDataById.idEpic;
    this.responseNumOrdine = this.responsegetDataById.id;
    this.responseEmail = this.responsegetDataById.Email;
    this.responseOggetti = this.responsegetDataById.oggetti_ordinati[0];
    this.responseData = this.responsegetDataById.time;
    this.totaleCrediti = this.responsegetDataById.totale_crediti;
    this.showObject = true;
  }

}
