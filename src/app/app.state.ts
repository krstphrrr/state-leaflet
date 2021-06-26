import { MapState } from "./components/map/map.state";
import { CheckboxState } from "./app.reducer";

export interface AppState{
  readonly mapState: MapState;
  readonly checkboxState: CheckboxState
}