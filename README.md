[![Build Status](https://img.shields.io/travis/miraxes/angular-custom-tour.svg?style=flat-square)](https://travis-ci.org/miraxes/angular-custom-tour)
[![Downloads](https://img.shields.io/npm/dt/angular-custom-tour.svg?style=flat-square)](https://www.npmjs.com/package/angular-custom-tour)
[![Versions](https://img.shields.io/npm/v/angular-custom-tour.svg?style=flat-square)]()
[![License](https://img.shields.io/npm/l/angular-custom-tour.svg?style=flat-square)]()

# Demo
[https://miraxes.github.io/angular-custom-tour](https://miraxes.github.io/angular-custom-tour)


# Custom tour with Angular 2.x.x

Follow instructions and everything should be fine. :)

# Usage

  * install `npm install angular-custom-tour --save`

In your module (app.module.ts)
  ```typescript
  import { HintModule } from 'angular-custom-tour'

  @NgModule({
    ...
    imports: [
      ...
      HintModule // Put here
      ...
    ]
    ...
  ]
  ```
Initialize it in your page component
  ```typescript
  import { HintService } from 'angular-custom-tour'

  @Component({
    ...
    providers: [... HintService ... ],
    ...
  })

  class AppComponent {

    constructor(public hintService: HintService){ }

    startTour() {
      this.hintService.initialize();
    }

  }
  ```

  ## NOTE:

  > In case you want to init slider after pageload, you should use ngAfterViewInit

  ```html
  <!-- Bluring element insert on top of the page-->
  <hint></hint>

  <!-- start TOUR -->
  <button name="button" (click)="startTour()"> START!</button>

  <!-- Each step could be placed at ANYWHERE -->
  <div class="i-want-highlight-this" id="highlight-me"> WOW!</div>

  <tour-step selector="highlight-me" order="3" position="right" title="title string">
    <!-- ANY HTML HERE
      NOTE: ONLY selector attribute is required! others is up to you
    -->
  </tour-step>
  ```
Also you need to inject styles from `styles/main.css`


# Custom options Usage

```typescript

  startTour() {
    let hOpt = new HintOptions();

    hOpt.elementsDisabled = false; //change whatever you want

    this.hintService.initialize(hOpt);
  }

}
```

Colons can be used to align columns.

| option                     | default   | Usage  |
| -------------------------- |:---------:| ------ |
| elementsDisabled: boolean  | true      | Disabling highlightedElement (click) wont work|
| defaultPosition: string    | 'bottom'  | Position of tour step to highlightedElement |
| defaultOrder: number       | 99        | Order of showing steps |
| defaultLayer: number       | 15        | Distance between highlightedElement and step in px |
| applyRelative: boolean     | true      | Applying position:relative to highlightedElement (disable in case you want to highligh absolute positioned elements) |


This module in active development mode, if you have any suggestions fell free to contact me.
