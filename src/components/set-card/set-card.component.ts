import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-set-card',
  templateUrl: './set-card.component.html',
  styleUrls: ['./set-card.component.scss'],
})
export class SetCardComponent implements OnInit {
  @Output() fromChild = new EventEmitter();
  @Input () parentVal: any;
  constructor() { }

  ngOnInit() {}

  set() {
    this.fromChild.emit(false);
  }
}
