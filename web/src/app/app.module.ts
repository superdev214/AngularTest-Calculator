import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { DataForm } from './dataForm/dataForm.component';
import { DataList } from './dataList/dataList.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, DataForm, DataList],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterTestingModule,
    RouterModule.forRoot([{ path: '', component: DataForm }]),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
