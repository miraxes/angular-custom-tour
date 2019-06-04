import { Component, Input, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HintService } from '../hint.service';
import { HintConfig } from '../variables';
import { tourHintAnimation } from '../animations';

@Component({
  selector: HintConfig.HINT_TAG,
  template: `<div class="intro-tour-hint-wrapper {{transformClass}} step{{order}} {{position}}"
  *ngIf="showme" [ngStyle]="{'top': topPos+'px', 'left': leftPos+'px'}"
                  [@tourHintAnimation]="{value: tourHintAnimation, params: { transformStart: transformStart, transformEnd: transformEnd}}">
    <div class="header" *ngIf="title">
        {{title}}
        <a *ngIf="dismissible" class="close navigate-btn navigate-btn__close" (click)="exit()">&#10006;</a>
    </div>
    <div class="content"><ng-content></ng-content></div>
    <div class="footer">
      <a class="navigate-btn navigate-btn__previous" *ngIf="hasPrev" (click)="prev()">Previous</a>
      <a class="navigate-btn navigate-btn__next" *ngIf="hasNext" (click)="next()">Next</a>
      <a class="navigate-btn navigate-btn__next" *ngIf="!hasNext" (click)="exit()">Finish Tour</a>
    </div>
  </div>`,
  animations: [ tourHintAnimation ],
})
export class TourComponent implements OnInit {
  @Input() title: string;
  @Input() selector: string;
  @Input() order: number;
  @Input() position: string;
  @Input() public dismissible: boolean;
  showme: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  topPos: number;
  leftPos: number;
  transformClass: string = 'transformX_50 transformY_100';
  transformStart: boolean | string = 'translateX(-50%) translateY(-60%)';
  transformEnd: boolean | string = 'translateX(-50%) translateY(-100%)';
  transformY: boolean;
  transformX: boolean;
  constructor(public hintService: HintService,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.hintService.register(this.selector, this);
  }

  showStep(): void {
    this.hintService.showingStep$.next(this);
    this.dismissible = this.dismissible || this.hintService.hintOptions.dismissible;
    this.position = this.position || this.hintService.hintOptions.defaultPosition;
    this.order = +this.order || this.hintService.hintOptions.defaultOrder;
    let highlightedElement = this.document.getElementById(this.selector);

    if (highlightedElement) {
      highlightedElement.style.zIndex = HintConfig.Z_INDEX;

      if (this.hintService.hintOptions.elementsDisabled) {
        this.disableClick(highlightedElement);
      }

      if (this.hintService.hintOptions.applyRelative) {
        highlightedElement.classList.add('hint-relative');
      }

      switch (this.position) {
        case 'top':
          this.transformClass = 'transformX_50 transformY_100';
          this.transformStart = 'translateX(-50%) translateY(-60%)';
          this.transformEnd = 'translateX(-50%) translateY(-100%)';
          this.topPos = highlightedElement.offsetTop - this.hintService.hintOptions.defaultLayer;
          this.leftPos = highlightedElement.offsetLeft + highlightedElement.offsetWidth / 2;
          break;
        case 'bottom':
          this.transformClass = 'transformX_50';
          this.transformStart = 'translateX(-50%) translateY(-20%)';
          this.transformEnd = 'translateX(-50%) translateY(0%)';
          this.topPos = highlightedElement.offsetTop + highlightedElement.offsetHeight + this.hintService.hintOptions.defaultLayer;
          this.leftPos = highlightedElement.offsetLeft + highlightedElement.offsetWidth / 2;
          break;
        case 'left':
          this.transformClass = 'transformY_50 transformX_100';
          this.transformStart = 'translateY(-50%) translateX(-75%)';
          this.transformEnd = 'translateY(-50%) translateX(-100%)';
          this.topPos = highlightedElement.offsetTop + highlightedElement.offsetHeight / 2;
          this.leftPos = highlightedElement.offsetLeft - this.hintService.hintOptions.defaultLayer;
          break;
        case 'right':
          this.transformClass = 'transformY_50';
          this.transformStart = 'translateY(-50%) translateX(-10%)';
          this.transformEnd = 'translateY(-50%) translateX(0%)';
          this.topPos = highlightedElement.offsetTop + highlightedElement.offsetHeight / 2;
          this.leftPos = highlightedElement.offsetLeft + highlightedElement.offsetWidth + this.hintService.hintOptions.defaultLayer;
          break;
        default:
          throw 'Invalid hint position ->' + this.position;
      }
    } else {
      this.topPos = 0;
      this.leftPos = 0;
    }

    this.showme = true;
    this.hasNext = this.hintService.hasNext();
    this.hasPrev = this.hintService.hasPrev();

  }

  hideStep(): void {
    let highlightedElement = this.document.getElementById(this.selector);

    if(highlightedElement) {
      highlightedElement.style.zIndex = '0';
      this.enableClick(highlightedElement);
      highlightedElement.classList.remove('hint-relative');
    }

    this.showme = false;
  }

  exit(): void {
    this.hintService.end();
  }

  next(): void {
    this.hideStep();
    this.hintService.showNext();
  }

  prev(): void {
    this.hideStep();
    this.hintService.showPrev();
  }

  private disableClick(element: HTMLElement): void {
    element.classList.add('hint-disabled');
  }
  private enableClick(element: HTMLElement): void {
    element.classList.remove('hint-disabled');
  }

}
