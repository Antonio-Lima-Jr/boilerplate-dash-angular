/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbGlobalPhysicalPosition,
  NbMenuModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Interceptor } from './app.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot({
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    }),
    NbSpinnerModule,
    NbChatModule.forRoot({
      messageGoogleMapKey: '',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    Interceptor,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
