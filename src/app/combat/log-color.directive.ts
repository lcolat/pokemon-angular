import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { LogType } from '../logic/Combat';

@Directive({
  selector: '[logColor]',
})
export class LogColorDirective implements OnInit {
  @Input('logColor') logType!: LogType;

  constructor(private renderer: Renderer2, private elmRef: ElementRef) {}

  ngOnInit(): void {
    let color: string;

    switch (this.logType) {
      case 'dead':
        color = 'red';
        break;
      case 'attack':
      case 'critical':
      case 'damage':
      case 'hp':
      case 'newRound':
      case 'win':
      default:
        color = 'black';
    }

    this.renderer.setStyle(this.elmRef.nativeElement, 'color', color);
  }
}
