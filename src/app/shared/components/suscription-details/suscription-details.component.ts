import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-suscription-details',
  templateUrl: './suscription-details.component.html',
  styleUrls: ['./suscription-details.component.scss'],
})
export class SuscriptionDetailsComponent implements OnInit {
  img = environment.subs_img;
  constructor() { }

  ngOnInit() {}

}
