import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [CommonModule, RouterModule,FormsModule],
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSignup() {
    const newUser = { name: this.name, email: this.email, password: this.password };

    // Get existing users from local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the email is already registered
    const existingUser = users.find((user: any) => user.email === this.email);
    if (existingUser) {
      alert('This email is already registered. Please use a different one.');
      return;
    }

    // Add the new user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful! You can now log in.');
    this.router.navigate(['/login']);
  }
}
