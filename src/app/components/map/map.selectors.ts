import { createSelector } from '@ngrx/store';
import { CheckboxState } from 'src/app/app.reducer';

import { AppState } from 'src/app/app.state';
import { MapState } from './map.state';

export const selectMapState = (state:AppState)=>state.mapState

export const selectCheckState = (state:AppState)=>state.checkboxState

export const selectMapViewPropertiesExtent = createSelector(
  selectMapState,
  (state: MapState) => {
      return state?.mapViewProperties?.extent;
  }
);

export const selectWebMap = createSelector(
  selectMapState,
  (state: MapState) => {
      return state?.webMap
  }
);

export const selectCheckbox= createSelector(
  selectCheckState,
  (state) => state.check
);

// export const testSelector = createSelector(
//   selectCheckState,
// )