import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-my-row',
  templateUrl: './my-row.component.html',
  styleUrls: ['./my-row.component.scss'],
})
export class MyRowComponent implements OnInit {


  @Input() loc: string;
  @Input() index: number;
  @Output() removeItemCall = new EventEmitter<number>();



  constructor() { }

  ngOnInit() {}

  removeItem(){
    this.removeItemCall.next(this.index);
  }
}
