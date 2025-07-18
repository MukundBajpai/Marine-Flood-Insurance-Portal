import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../Component/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../Component/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule, RouterModule, FooterComponent,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Marine';
  showNavbar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !['/login', '/signup'].includes(event.urlAfterRedirects);
      }
    });
  }
}
