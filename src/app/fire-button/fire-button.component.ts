import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fire-button',
  templateUrl: './fire-button.component.html',
  styleUrls: ['./fire-button.component.scss']
})
export class FireButtonComponent implements OnInit {

  @Input() name: string;
  @Input() width: number = 300;
  @Input() height: number = 40;
  @Input() color: string = "#fff";

  constructor() { }

  ngOnInit() {
  }

}
