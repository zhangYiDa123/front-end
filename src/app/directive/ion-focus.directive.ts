import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appIonFocus]'
})

export class IonFocusDirective {
  dom = null;
  constructor(private el: ElementRef) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentInit() {}

  @HostListener('click', ['$event.target.']) onclick(btn) {
    console.log(btn);
  }

  @HostListener('focus', ['$event.target']) onfocus(btn) {
    console.log(2);
  }
}

