import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../services/resume.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cv-viewer',
  templateUrl: './cv-viewer.component.html',
  styleUrls: ['./cv-viewer.component.css']
})
export class CvViewerComponent implements OnInit {
  cv: any = {}; // بيانات السيرة الذاتية

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // جلب الـ ID من الرابط
    if (id) {
      this.resumeService.getResumeById(id).subscribe(
        (response) => {
          this.cv = response.result || {}; // تعيين بيانات السيرة الذاتية
          console.log('✅ CV Data:', this.cv);
        },
        (error) => {
          console.error('❌ Error fetching CV:', error);
        }
      );
    } else {
      console.error('❌ No ID found in route!');
    }
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  downloadAsPDF() {
    const element = document.querySelector('.cv-container') as HTMLElement;
    
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
  
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save('cv.pdf');
    });
  }
  
}