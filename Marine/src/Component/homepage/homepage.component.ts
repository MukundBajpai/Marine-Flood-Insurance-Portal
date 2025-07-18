import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [RouterModule,CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit, AfterViewInit {
  floodInsuranceDetails: any[] = [];
  testimonials: any[] = [];
  plans: any[] = [];
  partners: any[] = [];
  claimsPartners: any[] = [];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('scrollGrid') scrollGrid!: ElementRef;

  private scrollPosition = 0;
  private scrollSpeed = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.floodInsuranceDetails = [
      {
        title: 'Flood Risk Assessments',
        description: 'Understand the likelihood and potential damage of flooding in your area with our detailed flood risk assessments.',
        image: 'assets/flood-risk.jpg'
      },
      {
        title: 'Community Protections',
        description: 'Benefit from community protections such as dunes, wetlands, seawalls, and pumps to reduce flood risk.',
        image: 'assets/community-protection.jpg'
      },
      {
        title: 'Flood Resilience',
        description: 'Enhance your resilience to flood events with timely warnings, temporary barriers, and effective evacuation plans.',
        image: 'assets/flood-resilience.jpg'
      }
    ];

    this.testimonials = [
      {
        name: 'AquaSure Agency',
        feedback: 'A trustworthy partner in flood insurance. Their portal makes everything smooth!',
        logo: 'assets/testimonial1.png'
      },
      {
        name: 'Coastal Guard Brokers',
        feedback: 'The quote system is reliable and detailed. Highly recommended!',
        logo: 'assets/testimonial2.png'
      },
      {
        name: 'SafeHarbor Underwriters',
        feedback: 'We’ve improved turnaround times and customer satisfaction thanks to this platform.',
        logo: 'assets/testimonial3.png'
      },
      {
        name: 'BlueTide Brokers',
        feedback: 'Exceptional service and easy quote submissions.',
        logo: 'assets/testimonial4.png'
      }
    
    ];
    this.plans = [
      {
        name: 'Silver Plan',
        type: 'silver',
        features: [
          'Basic flood coverage',
          'Community protection eligibility',
          'Online quote support'
        ]
      },
      {
        name: 'Gold Plan',
        type: 'gold',
        features: [
          'Enhanced flood coverage',
          'Priority support',
          'Risk assessment reports',
          'Community protection + flood resilience'
        ]
      },
      {
        name: 'Platinum Plan',
        type: 'platinum',
        features: [
          'Comprehensive flood protection',
          'Dedicated claim handler',
          'Customized evacuation & barrier planning',
          'Premium response time'
        ]
      }
    ];

    this.partners = [
      {
        name: 'Shield House',
        logo: 'partner1.png',
        lineOfInsurance: 'Home Insurance'
      },
      {
        name: 'AquaTrust Inc.',
        logo: 'assets/partner2.png',
        lineOfInsurance: 'Commercial & Residential'
      },
      {
        name: 'Condo Insure Hub',
        logo: 'assets/partner3.png',
        lineOfInsurance: 'Condo Insurance'
      },
      {
        name: 'WaveGuard Underwriters',
        logo: 'assets/partner4.png',
        lineOfInsurance: 'Flood and Storm Policies'
      }
    ];
    this.claimsPartners = [
      {
        name: 'RapidClaim Services',
        logo: 'assets/claim1.png',
        lineOfBusiness: 'Flood Claims Handling'
      },
      {
        name: 'SureSettle Experts',
        logo: 'assets/claim2.png',
        lineOfBusiness: 'Claims Adjusting & Resolution'
      },
      {
        name: 'ClaimPro Flood',
        logo: 'assets/claim3.png',
        lineOfBusiness: 'Disaster Recovery Support'
      }
    ];
    

  }

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  private startAutoScroll(): void {
    setInterval(() => this.autoScroll(), 30);
  }

  private autoScroll(): void {
    if (!this.scrollContainer || !this.scrollGrid) return;

    this.scrollPosition += this.scrollSpeed;
    const scrollContainerEl = this.scrollContainer.nativeElement;
    const scrollGridEl = this.scrollGrid.nativeElement;

    scrollContainerEl.scrollLeft = this.scrollPosition;

    if (this.scrollPosition >= scrollGridEl.scrollWidth - scrollContainerEl.clientWidth) {
      this.scrollPosition = 0;
    }
  }

  onGetQuoteClick(): void {
    const isLoggedIn = !!localStorage.getItem('loggedInUser');
    if (isLoggedIn) {
      this.router.navigate(['/quoteform']);
    } else {
      alert('Please log in to get a quote.');
      this.router.navigate(['/login']);
    }
  }
  
  onRiskCalculatorClick(): void {
    this.router.navigate(['/riskcalculator']);
  }
  
}