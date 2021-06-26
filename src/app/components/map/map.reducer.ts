import { Action, createReducer, on, } from '@ngrx/store';
import { MapViewProperties } from 'src/app/models/map-view-properties';
import { ServiceStatusTypes } from 'src/app/models/service-status.types';
import { ServiceStatus } from 'src/app/models/service-status'
import * as MapActions from './map.actions';

export interface MapState {
  status: ServiceStatus;
  mapViewProperties?: MapViewProperties;
}

const initialState: MapState = {
  status: new ServiceStatus(ServiceStatusTypes.content)
};

export function mapReducer(state = initialState, action: Action): MapState {
  return reducer(state, action);
}

const reducer = createReducer(
  initialState,
  on(MapActions.UpdateMapViewProperties, (state, action) => {
    console.log("MM")
      return updateMapViewProperties(state, action.mapViewProperties);
  }),
);

function updateMapViewProperties(state: MapState, mapViewProperties: MapViewProperties): MapState {
  console.log(state)
  return {
      ...state,
      mapViewProperties: {
          ...state.mapViewProperties,
          ...mapViewProperties
      }
  };
}

