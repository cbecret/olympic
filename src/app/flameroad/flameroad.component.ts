import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'flameroad',
  templateUrl: './flameroad.component.html',
  styleUrls: ['./flameroad.component.scss']
})
export class FlameroadComponent implements OnInit {

  isOpen = true;
  position = 1;
  positionLength = 5;

  constructor() { }

  ngOnInit() {
  }

  toggleFlameroad() {
    this.isOpen = !this.isOpen;
    console.log("toggle");
  }

  previousTown() {
    if (this.position-- !== 0) this.position--;
  }

  nextTown() {
    if (this.position++ !== this.positionLength) this.position++;
  }

}
