import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[rotate]',
})
export class RotateDirective {
  @Input() rotate: number = 0;
  @Input() step: number = 10;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const rotateStep = event.shiftKey ? -this.step : this.step;
    this.rotate += rotateStep;
    this.rotateElement();
  }

  private rotateElement() {
    this.el.nativeElement.style.transform = `rotate(${this.rotate}deg)`;
  }
}
