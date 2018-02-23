import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MnFullpageModule } from 'ngx-fullpage';
import { ScrollbarModule } from 'ngx-scrollbar';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ImagegridComponent } from './imagegrid/imagegrid.component';
import { MenuComponent } from './menu/menu.component';
import { EarthComponent } from './earth/earth.component';
import { EarthMobileComponent } from './earth-mobile/earth-mobile.component';
import { FireButtonComponent } from './fire-button/fire-button.component';
import { VoidButtonComponent } from './void-button/void-button.component';
import { VotingPathComponent } from './voting-path/voting-path.component';
import { VotingTorchComponent } from './voting-torch/voting-torch.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ImagegridComponent,
    MenuComponent,
    EarthComponent,
    EarthMobileComponent,
    FireButtonComponent,
    VoidButtonComponent,
    VotingPathComponent,
    VotingTorchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ScrollbarModule,
    MnFullpageModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
