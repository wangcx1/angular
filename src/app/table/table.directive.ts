import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[greet]'
})
export class TableDirective {
  @Input() greets: string;

  @HostBinding()
  get innerText() {
    return this.greets;
  }
  constructor() {
  }

}
