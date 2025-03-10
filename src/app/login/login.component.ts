import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // ✅ متغير لتخزين رسالة الخطأ

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.errorMessage = ''; // ✅ إخفاء رسالة الخطأ إذا تم تسجيل الدخول بنجاح
          this.router.navigate(['/resume-list']); // ✅ إعادة التوجيه للصفحة الرئيسية
        } else {
          this.errorMessage = 'Invalid username or password!'; // ✅ عرض رسالة الخطأ
        }
      },
      (error) => {
        this.errorMessage = 'Invalid username or password!'; // ✅ عرض رسالة الخطأ
      }
    );
  }
}
