import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    console.log('✅ onSubmit triggered'); // For debug

    this.submitted = true;
    this.errorMessage = '';

    if (form.invalid) {
      alert('Please enter valid email and password before submitting.');
      return;
    }

    this.loading = true;

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const validUser = users.find(
        (user: any) =>
          user.email.toLowerCase() === this.email.toLowerCase() &&
          user.password === this.password
      );

      if (validUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(validUser));
        alert('Login successful!');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid email or password!';
      }
    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage = 'An unexpected error occurred. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  guestLogin() {
    alert('Logged in as Guest');
    this.router.navigate(['/home']);
  }
}
