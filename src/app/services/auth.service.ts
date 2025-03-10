import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5024/api/Users/auth';
  private reg ='http://localhost:5024/api/Register/register';
 // 🔥 BehaviorSubject لمتابعة حالة المستخدم
 private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
 isAuthenticated$ = this.isAuthenticated.asObservable();

 constructor(private http: HttpClient, private router: Router) {}

 login(username: string, password: string): Observable<any> {
   return new Observable(observer => {
     this.http.post<any>(this.apiUrl, { username, password }).subscribe(
       (response) => {
         localStorage.setItem('token', response.token);
         this.isAuthenticated.next(true); // ✅ تحديث الحالة فورًا
         observer.next(response);
         observer.complete();
       },
       (error) => observer.error(error)
     );
   });
 }
 Register(username: string, password: string): Observable<any> {
  return new Observable(observer => {
    this.http.post<any>(this.reg, { username, password }).subscribe(
      (response) => {
        observer.next(response);
        observer.complete();
      },
      (error) => observer.error(error)
    );
  });
}

 logout(): void {
   localStorage.removeItem('token');
   this.isAuthenticated.next(false); // ✅ تحديث الحالة فورًا
   this.router.navigate(['/login']);
 }

 private hasToken(): boolean {
   return !!localStorage.getItem('token');
 }

  getToken(): string | null {
    return localStorage.getItem('token'); // جلب التوكن عند الحاجة
  }
}
