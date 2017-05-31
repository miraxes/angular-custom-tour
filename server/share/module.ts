import {
  NgModule,
  ModuleWithProviders
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { MmHintModule } from '../../src'

@NgModule({
  imports: [
    CommonModule,
    MmHintModule
  ],
  exports: [
    CommonModule,
    MmHintModule
  ]
})
export class ShareModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShareModule
    }
  }
}
