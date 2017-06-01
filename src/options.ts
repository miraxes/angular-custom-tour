import { HintConfig } from './variables';

export class HintOptions {
  elementsDisabled?: boolean = true;
  defaultPosition?: string = HintConfig.DEFAULT_POSITION;
  defaultOrder?: number = HintConfig.DEFAULT_ORDER;
  defaultLayer?: number = HintConfig.DEFAULT_PX_LAYER;
  applyRelative?: boolean = HintConfig.APPLY_RELATIVE;
}
