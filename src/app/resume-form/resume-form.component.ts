import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../services/resume.service';
import { Education, Experience, ResumeData, Skill } from '../model/resume.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css']
})
export class ResumeFormComponent {
  resumeData: ResumeData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    summary: '',
    educations: [],
    skills: [],
    experiences: [],
    attachment: null
  };

  constructor(private resumeService: ResumeService, private router: Router,    private snackBar: MatSnackBar 
  ) {}

  // 📌 إضافة التعليم
  addEducation() {
    this.resumeData.educations.push({ institutionName: '', degree: '', startDate: '', endDate: '' });
  }

  // ❌ حذف التعليم
  removeEducation(index: number) {
    this.resumeData.educations.splice(index, 1);
  }

  // 📌 إضافة المهارة
  addSkill() {
    this.resumeData.skills.push({ skillName: '' });
  }

  // ❌ حذف المهارة
  removeSkill(index: number) {
    this.resumeData.skills.splice(index, 1);
  }

  // 📌 إضافة الخبرة
  addExperience() {
    this.resumeData.experiences.push({ companyName: '', jobTitle: '', startDate: '', endDate: '', description: '' });
  }

  // ❌ حذف الخبرة
  removeExperience(index: number) {
    this.resumeData.experiences.splice(index, 1);
  }

  // 📌 رفع الملف
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.resumeData.attachment = event.target.files[0];
    }
  }

  // 📌 إرسال البيانات إلى API
  onSubmit() {
    const formData = new FormData();
    
    formData.append('fullName', this.resumeData.fullName);
    formData.append('email', this.resumeData.email);
    formData.append('phoneNumber', this.resumeData.phoneNumber);
    formData.append('address', this.resumeData.address);
    formData.append('summary', this.resumeData.summary);

    // 📌 تحديد نوع البيانات داخل `forEach`
    this.resumeData.educations.forEach((edu: Education, index: number) => {
      formData.append(`educations[${index}].institutionName`, edu.institutionName);
      formData.append(`educations[${index}].degree`, edu.degree);
      formData.append(`educations[${index}].startDate`, edu.startDate);
      formData.append(`educations[${index}].endDate`, edu.endDate);
    });

    this.resumeData.skills.forEach((skill: Skill, index: number) => {
      formData.append(`skills[${index}].skillName`, skill.skillName);
    });

    this.resumeData.experiences.forEach((exp: Experience, index: number) => {
      formData.append(`experiences[${index}].companyName`, exp.companyName);
      formData.append(`experiences[${index}].jobTitle`, exp.jobTitle);
      formData.append(`experiences[${index}].startDate`, exp.startDate);
      formData.append(`experiences[${index}].endDate`, exp.endDate);
      formData.append(`experiences[${index}].description`, exp.description);
    });

    if (this.resumeData.attachment) {
      formData.append('Attachment', this.resumeData.attachment);
    }

    console.log('📡 يتم إرسال البيانات التالية إلى السيرفر:', formData);

    this.resumeService.createResume(formData).subscribe(
      (response) => {
        console.log('✅ تم إرسال السيرة الذاتية بنجاح!', response);
        this.snackBar.open('✅تم إرسال السيرة الذاتية بنجاح!', 'إغلاق', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });        this.router.navigate(['/resume-list']);
      },
      (error) => {
        console.error('❌ حدث خطأ أثناء إرسال السيرة الذاتية:', error);
        this.snackBar.open('❌ حدث خطأ أثناء إرسال السيرة الذاتية', 'إغلاق', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });      }
    );
  }

}
