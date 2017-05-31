import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MmTourComponent } from './intro-tour/tour.component';
import { HintOptions } from './options';
import { HintConfig } from './variables';

export interface Step {
  selector: string;
  order: number;
}

@Injectable()
export class HintService {
  currentStep: Step;
  steps: Step[];
  hintOptions: HintOptions;
  anchors: { [selector: string]: MmTourComponent } = {};
  overlay$: Subject<boolean> = new Subject();
  registration$: Subject<boolean> = new Subject();

  /**
   * Initialize hint service
   * @method initialize
   * @param  {HintOptions} options init options
   * @return void
   */
  public initialize(options: HintOptions = new HintOptions()): void {
    this.hintOptions = options;
    let nodes = document.getElementsByTagName(HintConfig.HINT_TAG);
    this.steps = this.initSteps(nodes);
    this.startAt(0);
    this.overlay$.next(true);
    this.show(this.currentStep);
  }
  /**
   * Show step
   * @method show
   * @param  {Step} step [description]
   */
  public show(step: Step): void {
    const anchor = this.anchors[step.selector];
    if (!anchor) {
      return;
    }
    anchor.showStep();
  }
  /**
   * Show step next to {Step} this.currentStep
   * @method showNext
   */
  public showNext(): void {
    this.currentStep = this.steps[this.steps.indexOf(this.currentStep) + 1];
    const anchor = this.anchors[this.currentStep.selector];
    if (!anchor) {
      return;
    }
    anchor.showStep();
  }
  /**
   * Show step previous to {Step} this.currentStep
   * @method showPrev
   */
  public showPrev(): void {
    this.currentStep = this.steps[this.steps.indexOf(this.currentStep) - 1];
    const anchor = this.anchors[this.currentStep.selector];
    if (!anchor) {
      return;
    }
    anchor.showStep();
  }
  /**
   * Register hint component
   * @method register
   * @param  {string}            selector  binded to
   * @param  {MmTourComponent} component itself
   */
  public register(selector: string, component: MmTourComponent): void {
    if (this.anchors[selector]) {
      throw 'selector ' + selector + ' already registered!';
    }
    this.anchors[selector] = component;
    this.registration$.next(true);
  }
  /**
   * Is {Step} this.currentStep has next
   * @method hasNext
   * @return {boolean}
   */
  public hasNext(): boolean {
    return this.steps.indexOf(this.currentStep) < this.steps.length - 1;
  }

  /**
   * Is {Step} this.currentStep has previous
   * @method hasPrev
   * @return {boolean}
   */
  public hasPrev(): boolean {
    return this.steps.indexOf(this.currentStep) > 0;
  }
  /**
   * Finalize our hint tour.
   * @method end
   */
  public end(): void {
    this.overlay$.next(false);
    const anchor = this.anchors[this.currentStep.selector];
    if (!anchor) {
      return;
    }
    this.currentStep = undefined;
    anchor.hideStep();
  }
  /**
   * Start hint tour at some position
   * @method startAt
   * @param  {number} stepId position in this.steps
   */
  public startAt(stepId: number): void {
    this.currentStep = this.steps[stepId];
  }
  /**
   * Convert Element[] to Step[]
   * @method initSteps
   * @param  {NodeListOf<Element>} nodes
   * @return {Step[]}
   */
  private initSteps(nodes: NodeListOf<Element>): Step[] {
    let steps = [];
    for (let i = 0; i < nodes.length; i++) {
        steps.push({
          selector: nodes[i].getAttribute('selector'),
          order: +nodes[i].getAttribute('order') || this.hintOptions.defaultOrder,
        });
    }
    return steps = steps.sort((el1, el2) => {
      return el1.order - el2.order;
    });
  }

}
