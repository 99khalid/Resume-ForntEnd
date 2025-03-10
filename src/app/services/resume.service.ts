import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // استيراد AuthService

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:5024/api/Resume';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // دالة لإعداد الهيدرات مع التوكن
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // استرجاع التوكن من AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }
  deleteResume(id: string): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.delete(`${this.apiUrl}/DeleteResume/${id}`, { headers });
  }
  
  // إرسال السيرة الذاتية إلى API
  createResume(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/PostNewResume`, formData, { headers: this.getHeaders() });
  }
  updateResume( resumeData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/PutResume`, resumeData,{ headers: this.getHeaders() });
  }

  // جلب السيرة الذاتية حسب ID
  getResumeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetResumeById/${id}`, { headers: this.getHeaders() });
  }

  // جلب جميع السير الذاتية
  getAllResumes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllResumes`, { headers: this.getHeaders() });
  }
}
