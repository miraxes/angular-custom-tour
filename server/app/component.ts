import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core'
import { HintService } from '../../src/hint.service';
import { HintOptions } from '../../src/options';

@Component({
  selector: 'angular-custom-tour-app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './template.html',
  providers: [HintService],
  styleUrls: [
    '../../styles/main.css',
    './style.css'
  ]
})
export class AppComponent implements OnInit {

  constructor(public hintService: HintService){
  }
  ngOnInit() { }

  startTour() {
    this.hintService.initialize({defaultPosition: 'bottom'});
  }
}
