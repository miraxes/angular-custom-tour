import { HintService } from './hint.service';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HintComponent } from './hint.component';
import { TourComponent } from './intro-tour/tour.component';

@NgModule({
    declarations: [HintComponent, TourComponent],
    exports: [HintComponent, TourComponent],
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
}

export { HintService, TourComponent };
