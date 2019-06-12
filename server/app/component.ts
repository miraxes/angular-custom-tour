import {
  Component,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { HintService } from '../../src/hint.service';
import { HintOptions } from '../../src/options';

@Component({
  // tslint:disable-next-line
  selector: 'angular-custom-tour-app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './template.html',
  providers: [HintService],
  styleUrls: [
    './style.css',
    '../../styles/styles.scss',
  ],
})
export class AppComponent implements OnInit {

  constructor(public hintService: HintService) {
  }
  ngOnInit(): void {
  this.hintService.showingStep$.subscribe(step => {
    console.log('STEPPY, ', step);
  });
  this.hintService.finish$.subscribe(finish => {
    console.log('Finished, ', finish);
  });
}

  startTour(): void {
    this.hintService.initialize({defaultPosition: 'bottom'});
  }
}
