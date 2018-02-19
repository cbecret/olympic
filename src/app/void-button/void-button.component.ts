import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'void-button',
  templateUrl: './void-button.component.html',
  styleUrls: ['./void-button.component.scss']
})
export class VoidButtonComponent implements OnInit {

  @Input() name: string;
  @Input() desc: string;
  @Input() private width: number = 300;
  @Input() private height: number = 40;
  @Input() private color: string = "#fff";

  constructor() { }

  ngOnInit() {
  }

}
