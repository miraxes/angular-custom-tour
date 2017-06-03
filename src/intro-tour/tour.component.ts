import { Component, Input, OnInit } from '@angular/core';
import { HintService } from '../hint.service';
import { HintConfig } from '../variables';

@Component({
  selector: HintConfig.HINT_TAG,
  template: `<div class="intro-tour-hint-wrapper {{transformClass}} step{{order}} {{position}}" *ngIf="showme" [ngStyle]="{'top': topPos+'px', 'left': leftPos+'px'}" >
    <div class="header" *ngIf="title">{{title}}</div>
    <div class="content"><ng-content></ng-content></div>
    <div class="footer">
      <a class="navigate-btn" *ngIf="hasPrev" (click)="prev()">&#8592;</a>
      <a class="navigate-btn" *ngIf="hasNext" (click)="next()">&#8594;</a>
      <a class="navigate-btn" (click)="exit()">&#10006;</a>
    </div>
  </div>`,
})
export class TourComponent implements OnInit {
  @Input() title: string;
  @Input() selector: string;
  @Input() order: number;
  @Input() position: string;
  showme: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  topPos: number;
  leftPos: number;
  transformClass: string;
  transformY: boolean;
  transformX: boolean;
  constructor(public hintService: HintService) {
  }

  ngOnInit(): void {
    this.hintService.register(this.selector, this);
  }

  showStep(): void {
    this.position = this.position || this.hintService.hintOptions.defaultPosition;
    this.order = +this.order || this.hintService.hintOptions.defaultOrder;
    let highlightedElement = document.getElementById(this.selector);

    if(highlightedElement){
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
          this.topPos = highlightedElement.offsetTop - this.hintService.hintOptions.defaultLayer;
          this.leftPos = highlightedElement.offsetLeft + highlightedElement.offsetWidth / 2;
          break;
        case 'bottom':
          this.transformClass = 'transformX_50';
          this.topPos = highlightedElement.offsetTop + highlightedElement.offsetHeight + this.hintService.hintOptions.defaultLayer;
          this.leftPos = highlightedElement.offsetLeft + highlightedElement.offsetWidth / 2;
          break;
        case 'left':
          this.topPos = highlightedElement.offsetTop + highlightedElement.offsetHeight / 2;
          this.leftPos = highlightedElement.offsetLeft - this.hintService.hintOptions.defaultLayer;
          this.transformClass = 'transformY_50 transformX_100';
          break;
        case 'right':
          this.topPos = highlightedElement.offsetTop + highlightedElement.offsetHeight / 2;
          this.leftPos = highlightedElement.offsetLeft + highlightedElement.offsetWidth + this.hintService.hintOptions.defaultLayer;
          this.transformClass = 'transformY_50';
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
    let highlightedElement = document.getElementById(this.selector);

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
