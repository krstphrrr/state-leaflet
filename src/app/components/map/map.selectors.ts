import { createSelector } from '@ngrx/store';

import { AppState } from 'src/app/app.state';
import { MapState } from './map.state';

export const selectMapState = (state:AppState)=>state.mapState

export const selectMapViewPropertiesExtent = createSelector(
  selectMapState,
  (state: MapState) => {
      return state?.mapViewProperties?.extent;
  }
);