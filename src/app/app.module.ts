import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { HttpClientModule } from '@angular/common/http'; // Required for HTTP requests
import { AppRoutingModule } from './app-routing.module'; // Required for routing

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { ResumeDetailsComponent } from './resume-details/resume-details.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CvViewerComponent } from './cv-viewer/cv-viewer.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResumeFormComponent,
    ResumeDetailsComponent,
    ResumeListComponent,
    NavbarComponent,
    FooterComponent,
    
    LandingComponent,
         CvViewerComponent,
         RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Required for ngModel
    HttpClientModule, // Required for HTTP requests
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule // Required for routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }