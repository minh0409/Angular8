import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { GridModule ,ExcelModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyDetailGuard } from './company-detail/company-detail.guard';
import { FormsModule , ReactiveFormsModule }   from '@angular/forms';
import { KendoGridComponent } from './kendo-grid/kendo-grid.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';

const appRoutes: Routes = [
  { path: 'welcome',              component: WelcomeComponent },
  { path: 'companyList',          component: CompanylistComponent },
  { path: 'kendoGrid',            component: KendoGridComponent },
  { path: 'company/edit/:id',     component: CompanyEditComponent },
  { path: 'company/:id',   
         canActivate: [CompanyDetailGuard],
         component:   CompanyDetailComponent },
  { path: 'createCompany', component: CompanyComponent },
  { path: '',   redirectTo: 'companyList', pathMatch: 'full' },
  { path: '**', redirectTo: 'companyList', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    WelcomeComponent,
    CompanylistComponent,
    CompanyDetailComponent,
    KendoGridComponent,
    CompanyEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExcelModule,
    HttpClientModule,
    ReactiveFormsModule ,
    GridModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
    appRoutes,
    { enableTracing: false } // 
  ),
    ButtonsModule,
    DropDownsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
