import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  responseOggetti: any = [];
  responseData: any = [];
  totaleCrediti: any;
  showObject: any;
  showInfoOrdine: Boolean = false;
  showCheck: Boolean = false;
  responseValues: any;
  showButton: Boolean = false;
  response: any;
  responseById: any = [];
  responsegetDataById: any;
  responseNumOrdine: any;
  responseEmail: any;

  constructor(public authService: AuthService, private fb: FormBuilder) { }

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

  idCheck: any = [];
  dataPath = 'ordini/';
  showPopupSicuro: Boolean = false;

  onClickCircle(id) {
    console.log(id);
    this.showCheck = !this.showCheck;
  }

  checkValue(e: any, id: any) {
    this.idCheck.push(id);
    this.showButton = true;
  }

  onClickButtonCompleted() {
    this.showPopupSicuro = true;
  }

  onClickSi() {
    this.authService.deleteDocument(this.dataPath, `${this.idCheck}`);
    this.getOrdini();
    this.showPopupSicuro = false;
    this.showButton = false;
    this.showInfoOrdine = false;
  }

  onClickNo() {
    this.showPopupSicuro = false;
  }
}
