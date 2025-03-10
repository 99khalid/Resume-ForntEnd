import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 username: string = '';
  password: string = '';
  errorMessage: string = ''; // ✅ متغير لتخزين رسالة الخطأ

  constructor(private authService: AuthService, private router: Router) {}

  Register() {
    this.authService.Register(this.username, this.password).subscribe(
      (response: any) => {
        if (response) {
          this.errorMessage = ''; // ✅ إخفاء رسالة الخطأ إذا تم تسجيل الدخول بنجاح
          this.router.navigate(['/login']); // ✅ إعادة التوجيه للصفحة الرئيسية
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
