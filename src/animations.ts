import { trigger, state, animate, transition, style, AnimationTriggerMetadata } from '@angular/animations';

export const tourHintAnimation =
    trigger( 'tourHintAnimation', [

        state('*', style({
        webkitTransform: '{{ transformEnd }}',
        transform: '{{ transformEnd }}' },
            ), {params: {transformStart: 'translateY(0)', transformEnd: 'translateY(0)'} }),

        transition(':enter', [

            style({
                opacity: 0,
                webkitTransform: '{{ transformStart }}',
                transform: '{{ transformStart }}',
            }),

            animate('.5s cubic-bezier(.4,.04,.08,1.42)', style({
                opacity: 1,
                webkitTransform: '{{ transformEnd }}',
                transform: '{{ transformEnd }}',
            })),
        ], {params: {transformStart: 'translateY(0)', transformEnd: 'translateY(0)'} }),

        transition(':leave', [
            style({
                opacity: 1,
                webkitTransform: '{{ transformEnd }}',
                transform: '{{ transformEnd }}',
            }),

            animate('.3s cubic-bezier(.25,.1,.25,1)', style({
                opacity: 0,
                webkitTransform: '{{ transformStart }}',
                transform: '{{ transformStart }}',
            })),

            animate( '.2s ease', style({
                'max-height': '0px',
            })),
        ], {params: {transformStart: 'translateY(0)', transformEnd: 'translateY(0)'} }),
    ]);
