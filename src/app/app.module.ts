import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { customBreakpointProvider } from './shared/layout/updateBreakpoints';
import { DEFAULT_BREAKPOINTS, BreakPoint } from '@angular/flex-layout'
import { validateSuffixes } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';

import { MatToolbarModule, MatSidenavModule, MatIconModule, MatCardModule, MatSelectModule, MatButtonModule, MatTableModule, MatDialog, MatDialogModule, MatTabsModule,  MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MathService } from './shared/math.service';
import { CatalogService } from './shared/catalog.service';
import { AssetService } from './shared/asset.service';

import { reducers } from './shared/ngrx/reducer';

import { AppComponent } from './app.component';
import { MapwrapperComponent } from './mapwrapper/mapwrapper.component';
import { FormcardComponent } from './formcard/formcard.component';
import { PlanetdetailscardComponent } from './planetdetailscard/planetdetailscard.component';
import { LengthPipe } from './shared/length.pipe';
import { SizeimagesComponent } from './sizeimages/sizeimages.component';
import { HelpdialogComponent } from './helpdialog/helpdialog.component';
import { InitialdialogComponent } from './initialdialog/initialdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MapwrapperComponent,
    FormcardComponent,
    PlanetdetailscardComponent,
    LengthPipe,
    SizeimagesComponent,
    HelpdialogComponent,
    InitialdialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers),
    MatToolbarModule, MatSidenavModule, MatIconModule, MatCardModule, MatSelectModule, MatButtonModule, MatTableModule, MatDialogModule,
    MatTabsModule,  MatExpansionModule
  ],
  providers: [
    MatDialog,
    MathService, CatalogService, AssetService,
    customBreakpointProvider
  ],
  entryComponents: [
    HelpdialogComponent, InitialdialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
