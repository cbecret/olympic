import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FlameroadComponent } from './flameroad/flameroad.component';
import { ImagegridComponent } from './imagegrid/imagegrid.component';
import { MenuComponent } from './menu/menu.component';
import { EarthComponent } from './earth/earth.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FlamepickerComponent } from './flamepicker/flamepicker.component';
import { FlameitemComponent } from './flameitem/flameitem.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FireButtonComponent } from './fire-button/fire-button.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FlameroadComponent,
    ImagegridComponent,
    MenuComponent,
    EarthComponent,
    NavigationComponent,
    FlamepickerComponent,
    FlameitemComponent,
    BreadcrumbComponent,
    FireButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
