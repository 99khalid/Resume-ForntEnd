import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { ResumeDetailsComponent } from './resume-details/resume-details.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { AuthGuard } from './auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { CvViewerComponent } from './cv-viewer/cv-viewer.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'landing', component: LandingComponent },

  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },

  
  { path: 'resume-form', component: ResumeFormComponent , canActivate: [AuthGuard] },
  { path: 'resume-details/:id', component: ResumeDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'view/:id', component: CvViewerComponent, canActivate: [AuthGuard]  },

  { path: 'resume-list', component: ResumeListComponent, canActivate: [AuthGuard]  },
  { path: '**', redirectTo: '/login' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }