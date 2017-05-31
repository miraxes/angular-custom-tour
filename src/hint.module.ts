import { HintService } from './hint.service';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FwylHintComponent } from './hint.component';
import { FwylTourComponent } from './intro-tour/tour.component';

@NgModule({
    declarations: [FwylHintComponent, FwylTourComponent],
    exports: [FwylHintComponent, FwylTourComponent],
    imports: [CommonModule],
})
export class HintModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: HintModule,
            providers: [
                HintService,
            ],
        };
    }
};

export { HintService };
