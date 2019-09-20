import { Directive, HostListener } from '@angular/core';
import * as screenfull from 'screenfull'; // import screenfull = require('screenfull');

@Directive({
  selector: '[appToggleFullscreen]'
})
export class FullscreenDirective {

  _screenfull: any = screenfull;

  @HostListener('click') onClick() {
    if (this._screenfull.enabled) {
      this._screenfull.toggle();
    }
  }
}
