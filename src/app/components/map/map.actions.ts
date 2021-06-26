import { createAction, props } from '@ngrx/store';

import { MapViewProperties } from '../../models/map-view-properties';

export enum MapActionTypes {
  UpdateMapViewProperties = 'UPDATE_MAP_VIEW_PROPERTIES',
}

export const UpdateMapViewProperties = createAction(
  MapActionTypes.UpdateMapViewProperties,
  props<{mapViewProperties: MapViewProperties}>()
);