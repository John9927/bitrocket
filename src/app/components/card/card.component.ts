import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private authService: AuthService) { }
  response: any = [];

  ngOnInit(): void {
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

}
