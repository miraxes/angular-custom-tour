import {
  NgModule,
  ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HintModule } from '../../src';

@NgModule({
  imports: [
    CommonModule,
    HintModule,
  ],
  exports: [
    CommonModule,
    HintModule,
  ],
})
export class ShareModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShareModule,
    };
  }
}
