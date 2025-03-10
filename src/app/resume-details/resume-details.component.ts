import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../services/resume.service';
import { Education, Experience, Skill } from '../model/resume.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resume-details',
  templateUrl: './resume-details.component.html',
  styleUrls: ['./resume-details.component.css']
})
export class ResumeDetailsComponent implements OnInit {
  resume: any = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    summary: '',
    educations: [],
    skills: [],
    experiences: []
  };

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    console.log('🆔 ID from route:', id); 

    if (id) {
      this.resumeService.getResumeById(id).subscribe(
        (response) => {
          console.log('📦 API Response:', response); 

          this.resume = response.result || {}; 

          if (!this.resume.id) {
            this.resume.id = id; 
          }

          console.log('✅ Final Resume Object:', this.resume); 
        },
        (error) => {
          console.error('❌ Error fetching resume details:', error);
        }
      );
    } else {
      console.error('❌ No ID found in route!');
    }
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.resume.attachment = event.target.files[0];
    }
  }
  formatDate(date: any): string {
    if (!date) return ''; 
    const d = new Date(date);
    return d.toISOString().split('T')[0]; 
  }

  formatDateForApi(date: any): string {
    if (!date) return ''; 
    const d = new Date(date);
    return d.toISOString(); 
  }
  updateResume() {
    const formData = new FormData();
    formData.append('ResumeId', this.resume.id);
    formData.append('fullName', this.resume.fullName);
    formData.append('email', this.resume.email);
    formData.append('phoneNumber', this.resume.phoneNumber);
    formData.append('address', this.resume.address);
    formData.append('summary', this.resume.summary);

    // 📌 تحديد نوع البيانات داخل `forEach`
    this.resume.educations.forEach((edu: Education, index: number) => {
      formData.append(`educations[${index}].institutionName`, edu.institutionName);
      formData.append(`educations[${index}].degree`, edu.degree);
      formData.append(`educations[${index}].startDate`, edu.startDate);
      formData.append(`educations[${index}].endDate`, edu.endDate);
    });

    this.resume.skills.forEach((skill: Skill, index: number) => {
      formData.append(`skills[${index}].skillName`, skill.skillName);
    });

    this.resume.experiences.forEach((exp: Experience, index: number) => {
      formData.append(`experiences[${index}].companyName`, exp.companyName);
      formData.append(`experiences[${index}].jobTitle`, exp.jobTitle);
      formData.append(`experiences[${index}].startDate`, exp.startDate);
      formData.append(`experiences[${index}].endDate`, exp.endDate);
      formData.append(`experiences[${index}].description`, exp.description);
    });

    if (this.resume.attachment) {
      if (this.resume.attachment) {
        formData.append('Attachment.File', this.resume.attachment, this.resume.attachment.name); // تأكد من إضافة اسم الملف
      }    }

    console.log('📡 يتم إرسال البيانات التالية إلى السيرفر:', formData);

    this.resumeService.updateResume(formData).subscribe(
      (response) => {
        console.log('✅ تم إرسال السيرة الذاتية بنجاح!', response);
        this.snackBar.open('✅ Resume updated successfully!', 'إغلاق', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      (error) => {
        console.error('❌ حدث خطأ أثناء إرسال السيرة الذاتية:', error);
        alert('حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.');
      }
    );
 }
  updatteResume() {
    if (!this.resume.id) {
      console.error('❌ Error: Resume ID is undefined!');
      alert('Error: Resume ID is missing. Please refresh the page.');
      return;
    }

    // تحويل التواريخ إلى تنسيق ISO قبل الإرسال
    this.resume.educations = this.resume.educations.map((edu: any) => ({
      ...edu,
      startDate: this.formatDateForApi(edu.startDate),
      endDate: this.formatDateForApi(edu.endDate)
    }));

    this.resume.experiences = this.resume.experiences.map((exp: any) => ({
      ...exp,
      startDate: this.formatDateForApi(exp.startDate),
      endDate: this.formatDateForApi(exp.endDate)
    }));

    console.log('✅ Sending PUT request with ID:', this.resume.id);

    console.log('Sending update request...');
    this.resumeService.updateResume(this.resume).subscribe(
      (response) => {
        console.log('Update request successful:', response);
        this.snackBar.open('✅ Resume updated successfully!', 'إغلاق', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      (error) => {
        console.error('Update request failed:', error);
        this.snackBar.open('❌ Update request failed', 'إغلاق', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }
}