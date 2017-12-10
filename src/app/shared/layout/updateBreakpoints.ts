import { NgModule } from '@angular/core';
import { DEFAULT_BREAKPOINTS, BreakPoint, BREAKPOINTS } from '@angular/flex-layout'
import { validateSuffixes } from '@angular/flex-layout';

/**
 * For mobile and tablet, reset ranges
 */
export function updateBreakpoints(it: BreakPoint) {
    switch (it.alias) {
        case 'xs': it.mediaQuery = '(max-height: 639px)'; break;
        case 'sm': it.mediaQuery = '(min-height: 640px) and (max-height: 699px)'; break;
        case 'md': it.mediaQuery = '(min-height: 700px) and (max-height: 799px)'; break;
        case 'lg': it.mediaQuery = '(min-height: 800px)'; break;
        case 'xl': it.mediaQuery = '(min-height: 800px)'; break;
    }
    return it;
}

export function customizeBreakPoints() {
    return validateSuffixes(DEFAULT_BREAKPOINTS.map(updateBreakpoints));
}

export let customBreakpointProvider = {
    provide: BREAKPOINTS,
    useFactory: customizeBreakPoints
};
