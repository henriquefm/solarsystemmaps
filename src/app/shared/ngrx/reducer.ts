import { Stuff } from './../models/stuff.model';
import { SpaceThing } from './../models/spacething.model';

import { Action } from '@ngrx/store';

export const MODEL_SELECTED = 'MODEL_SELECTED';
export const PLANET_FOCUSED = 'PLANET_FOCUSED';

export interface PlanetModelStore{
    planetModel: PlanetModelState,
    focusedPlanet: SpaceThing
}

export interface PlanetModelState{
    selectedPlanet: SpaceThing;
    selectedStuff: Stuff;
}

export interface UnsafeAction extends Action{
    payload: any
}

export function planetModelReducer(state: PlanetModelState, action: UnsafeAction) {
	switch (action.type) {
        case MODEL_SELECTED:
            return Object.assign({}, action.payload);

		default:
			return state;
	}
}

export function focusedPlanetReducer(state: SpaceThing, action: UnsafeAction) {
	switch (action.type) {
        case PLANET_FOCUSED:
            return Object.assign({}, action.payload);

		default:
			return state;
	}
}

export const reducers = {
    planetModel: planetModelReducer,
    focusedPlanet: focusedPlanetReducer
};