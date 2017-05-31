import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core'
import { HintService } from '../../src/hint.service';

@Component({
  selector: 'angular-custom-tour-app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './template.html',
  providers: [HintService],
  styleUrls: [
    './style.css'
  ]
})
export class AppComponent implements OnInit {

  constructor(public hintService: HintService){
    console.log('this.hintService', this.hintService);
  }
  ngOnInit() { }

  startTour() {
    this.hintService.initialize();
  }
}
