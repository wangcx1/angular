import {Attribute, Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[greet]'
})
export class GreetDirective {
  @Input() greet: string;
  public counter = 0;

  @HostBinding()
  get innerText() {
    return this.time(this.ldate);
  }

  constructor(@Attribute('ldate') public ldate: Date) {
    this.time(ldate);
  }

  ngOnInit() {
    setInterval(() => {
      if (this.counter > 1000) {
        this.counter = 0;
      }
      this.counter++;
    }, 1000);
  }

  private time(ldate: Date) {
    let days, hours, seconds, minutes;
    let t = Math.floor((new Date(ldate).getTime()) - (new Date().getTime()));
    days = Math.floor(t / 1000 / 60 / 60 / 24);
    hours = Math.floor(t / 1000 / 60 / 60 % 24);
    minutes = Math.floor(t / 1000 / 60 % 60);
    seconds = Math.floor(t / 1000 % 60);
    this.greet = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒';
    return this.greet;
  }
}
