import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebReqInterceptor } from './service/web-req.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { TaskModule } from './task/task.module';
import { ToastrModule } from 'ngx-toastr';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TaskModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxEchartsModule.forRoot({
      echarts
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
