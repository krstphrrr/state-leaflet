import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent} from './components/map/map.component'
import { WelcomeComponent } from './components/welcome/welcome.component'
// import { MapContentsComponent } from './components/map/map-contents/map-contents.component'
import { AboutComponent } from './components/about/about.component';
// import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,

  },
  {
    path: 'map',
    component: MapComponent,
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
