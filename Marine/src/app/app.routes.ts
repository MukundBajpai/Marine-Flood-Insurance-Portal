import { Routes } from '@angular/router';
import { DashboardComponent } from '../Component/dashboard/dashboard.component';
import { LoginComponent } from '../Component/login/login.component';
import { HomepageComponent } from '../Component/homepage/homepage.component';
import { QuoteformComponent } from '../Component/quoteform/quoteform.component';
import { QuoteListComponent } from '../Component/quote-list/quote-list.component';
import { FooterComponent } from '../Component/footer/footer.component';
import { AboutComponent } from '../Component/about/about.component';
import { SignupComponent } from '../Component/signup/signup.component';
import { ViewquoteComponent } from '../Component/viewquote/viewquote.component';
import { ContactUsComponent } from '../Component/contact-us/contact-us.component';
import { RiskCalculatorComponent } from '../Component/risk-calculator/risk-calculator.component';
import { MyclientsComponent } from '../Component/myclients/myclients.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent }
  ,
  { path: 'quoteform', component: QuoteformComponent}
  ,
  { path: 'quote-list', component: QuoteListComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'about', component: AboutComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'viewquote', component: ViewquoteComponent },
  { path: 'contactus', component: ContactUsComponent},
  { path: 'riskcalculator', component: RiskCalculatorComponent},
  { path: 'myclients', component: MyclientsComponent},



];
