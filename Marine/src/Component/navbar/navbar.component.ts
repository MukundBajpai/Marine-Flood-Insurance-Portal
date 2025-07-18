import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = false;
  userName = 'Guest';
  showDropdown = false; // Toggle dropdown visibility

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

    if (loggedInUser) {
      this.isLoggedIn = true;
      this.userName = loggedInUser.name; // Show the logged-in user's name
    } else {
      this.isLoggedIn = false;
      this.userName = 'Guest';
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    localStorage.removeItem('loggedInUser'); // Remove user data from storage
    this.isLoggedIn = false;
    this.userName = 'Guest';
    this.showDropdown = false;
    alert('Logged out successfully!');
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Navigate to home
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  // Redirect guest users to login page
  handleProfileClick() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.toggleDropdown(); // Show dropdown if logged in
    }
  }
}
