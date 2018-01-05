import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('position', [
      state('left', style({
        'margin-left': 0,
        'background-color': 'yellow',
        transform: 'scale(1)'
      })),
      state('right', style({
        'margin-left': 400,
        'background-color': 'blue',
        transform: 'scale(1.5)'
      })),
      transition('left=>right', animate('1000ms linear')),
      transition('right=>left', animate('1000ms linear'))
    ])
  ]
})

export class ModalComponent implements OnInit {
  currentPosition = 'left';

  constructor() {
  }

  ngOnInit() {
    setInterval(() => {
      if (this.currentPosition === 'left') {
        this.currentPosition = 'right';
      } else {
        this.currentPosition = 'left';
      }
    }, 1000);
  }

}
