import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MapComponent } from './components/map/map.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LeafletModule} from '@asymmetrik/ngx-leaflet';
import { CustomControlComponent } from './components/custom-control/custom-control.component';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { checkboxReducer } from './app.reducer';
import { mapReducer } from './components/map/map.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MapComponent,
    AboutComponent,
    HeaderComponent,
    SidenavListComponent,
    CustomControlComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    LeafletModule,
    HttpClientModule,
    StoreModule.forRoot({check:checkboxReducer, map: mapReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
