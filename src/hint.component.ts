import { HintService } from './hint.service';
import { Component } from '@angular/core';

@Component({
  selector: 'tour-overlay',
  template: `<div class="hint-overlay" *ngIf="show" (click)="dismiss()"></div>`,
})
export class HintComponent {
  show: boolean;

  constructor(public hintService: HintService) {
    this.hintService.overlay$.subscribe(data => this.show = data);
  }

  dismiss(): void {
    if(this.hintService.hintOptions.dismissOnOverlay)
      this.hintService.overlayNext();
  }

}
