import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../services/resume.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css']
})
export class ResumeListComponent implements OnInit {
  resumes: any[] = [];

  constructor(private resumeService: ResumeService, private router: Router,    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.loadResumes();
  }

  // تحميل قائمة السير الذاتية
  loadResumes() {
    this.resumeService.getAllResumes().subscribe(
      (response) => {
        this.resumes = response.result;
      },
      (error) => {
        console.error('Error fetching resumes:', error);
      }
    );
  }

  // عرض التفاصيل
  viewDetails(id: string): void {
    this.router.navigate(['/view', id]);
  }

  editResume(id: string) {
    this.router.navigate(['/resume-details', id]);}
  // حذف السيرة الذاتية
  deleteResume(id: string): void {
    if (confirm('هل أنت متأكد من حذف هذه السيرة الذاتية؟')) {
      this.resumeService.deleteResume(id).subscribe(
        () => {
     this.snackBar.open('✅ تم الحذف بنجاح:!', 'إغلاق', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });            this.resumes = this.resumes.filter(resume => resume.resumeId !== id);
        },
        (error) => {
          console.error('حدث خطأ أثناء الحذف:', error);
          this.snackBar.open('✅ حدث خطأ أثناء الحذف:!', 'إغلاق', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });        }
      );
    }
  }
}
