import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {ShortUrlsTableComponent} from './components/short-urls-table/short-urls-table.component';
import {ShortUrlInfoComponent} from './components/short-url-info/short-url-info.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {NgTinyUrlModule} from 'ng-tiny-url';
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [{path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'short-url', component: ShortUrlsTableComponent},
  {path: 'short-url-info/:id', component: ShortUrlInfoComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShortUrlsTableComponent,
    ShortUrlInfoComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgTinyUrlModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
