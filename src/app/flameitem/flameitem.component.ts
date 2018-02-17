import { Component, OnInit } from '@angular/core';
import { Url } from 'url';

@Component({
  selector: 'flameitem',
  templateUrl: './flameitem.component.html',
  styleUrls: ['./flameitem.component.scss']
})
export class FlameitemComponent implements OnInit {

  title: string = 'Torch type 4';
  subTitle: string = 'Nom du thème';
  imageUrl: string = 'www.test.fr';

  constructor() { }

  ngOnInit() {
  }

}
