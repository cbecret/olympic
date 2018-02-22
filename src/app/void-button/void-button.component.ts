import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'void-button',
  templateUrl: './void-button.component.html',
  styleUrls: ['./void-button.component.scss']
})
export class VoidButtonComponent implements OnInit {

  @Input() name: string;
  @Input() desc: string;
  @Input() width: number = 300;
  @Input() height: number = 40;
  @Input() color: string = "#fff";

  constructor() { }

  ngOnInit() {
  }

}
