# Will be available later
[![Build Status](https://img.shields.io/travis/miraxes/angular-custom-tour.svg?style=flat-square)](https://travis-ci.org/miraxes/angular-custom-tour)
[![Downloads](https://img.shields.io/npm/dt/angular-custom-tour.svg?style=flat-square)](https://www.npmjs.com/package/angular-custom-tour)
[![Versions](https://img.shields.io/npm/v/angular-custom-tour.svg?style=flat-square)]()
[![License](https://img.shields.io/npm/l/angular-custom-tour.svg?style=flat-square)]()
# demo
  [https://miraxes.github.io/angular-custom-tour](https://miraxes.github.io/angular-custom-tour)


# Custom tour with Angular 2.x.x

# Usage

  * install `npm install angular-custom-tour --save`

  ```typescript
  import { HintService } from '???'

  class AppComponent {

    constructor(public hintService: HintService){ }

    startTour() {
      this.hintService.initialize();
    }

  }
  ```

  ```html
  <!-- Bluring element insert on top of the page-->
  <fwyl-hint></fwyl-hint>

  <!-- start TOUR -->
  <button name="button" (click)="startTour()"> START!</button>

  <!-- Each step could be placed at ANYWHERE -->
  <div class="i-want-highlight-this" id="highlight-me"> WOW!</div>

  <fwyl-intro-tour selector="highlight-me" order="3" position="right" title="title string">
    <!-- ANY HTML HERE
      NOTE: ONLY selector attribute is required! others is up to you
    -->
  </fwyl-intro-tour>
  ```
