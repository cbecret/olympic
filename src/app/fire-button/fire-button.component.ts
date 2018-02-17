import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fire-button',
  templateUrl: './fire-button.component.html',
  styleUrls: ['./fire-button.component.scss']
})
export class FireButtonComponent implements OnInit {

  @Input() private innerText: string;
  @Input() private width: number = 300;
  @Input() private height: number = 40;
  @Input() private color: string = "#fff";

  constructor() { }

  ngOnInit() {
  }

}
