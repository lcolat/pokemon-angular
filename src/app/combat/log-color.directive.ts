import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { LogType } from '../fight/fight.service';

@Directive({
  selector: '[logColor]',
})
export class LogColorDirective implements OnInit {
  @Input('logColor') logType!: LogType;

  constructor(private renderer: Renderer2, private elmRef: ElementRef) {}

  ngOnInit(): void {
    let color: string;

    switch (this.logType) {
      case 'end':
        color = 'green';
        break;
      case 'damage':
      default:
        color = 'black';
    }

    this.renderer.setStyle(this.elmRef.nativeElement, 'color', color);
  }
}
