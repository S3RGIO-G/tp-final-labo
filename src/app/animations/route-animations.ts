import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slider = trigger('routeAnimations', [
  transition('* => login', slideToDefault('left')),
  transition('* => register', slideToDefault('right')),
  transition('register => *', slideToDefault('left')),
  transition('login => *', slideToDefault('right')),
  transition('historia => *', slideTo('left'),),
  transition('* <=> *', slideTo('right'),),
]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          
          [direction]: 0,
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%', transform: 'scale(0)' })], optional),
    group([
      query(
        ':leave',
        [animate('750ms ease', style({ [direction]: '100%', transform: 'scale(0)' }))],
        optional
      ),
      query(
        ':enter',
        [animate('750ms ease', style({ [direction]: '0%', transform: 'scale(1)' }))],
        optional
      ),
    ]),
  ];
}

function slideToDefault(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          overflow: 'hidden',
          [direction]: 0,
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%'})], optional),
    group([
      query(
        ':leave',
        [animate('750ms ease', style({ [direction]: '100%'}))],
        optional
      ),
      query(
        ':enter',
        [animate('750ms ease', style({ [direction]: '0%'}))],
        optional
      ),
    ]),
  ];
}
