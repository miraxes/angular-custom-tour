import { HintService } from './hint.service';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MmHintComponent } from './hint.component';
import { MmTourComponent } from './intro-tour/tour.component';

@NgModule({
    declarations: [MmHintComponent, MmTourComponent],
    exports: [MmHintComponent, MmTourComponent],
    imports: [CommonModule],
})
export class MmHintModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MmHintModule,
            providers: [
                HintService,
            ],
        };
    }
};

export { HintService };
