import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../../app/services/quote.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-viewquote',
  imports: [CommonModule,],
  templateUrl: './viewquote.component.html',
  styleUrl: './viewquote.component.css',
  
})
export class ViewquoteComponent implements OnInit {
  data: any;
  premium: number = 0;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private quoteService = inject(QuoteService);

  // premiumDetails = signal<any>(null);
  premiumDetails = signal({
    factors: [
      { name: 'Flood Zone', percentage: 30, details: 'Higher risk = higher premium' },
      { name: 'Elevation', percentage: 20, details: 'Lower elevation = higher risk' },
      { name: 'Building Coverage', percentage: 25, details: '₹500,000 coverage' },
      { name: 'Deductible', percentage: 15, details: 'Higher deductible = lower premium' },
      { name: 'Selected Plan', percentage: 10, details: 'More benefits = higher cost' },
    ],
  });
  

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as any;

    if (state?.premiumDetails) {
      this.premiumDetails.set(state.premiumDetails);
    }

    this.data = state?.formData;
    this.premium = state?.premium;
  }

  editQuote() {
    this.router.navigate(['/quote'], { state: { formData: this.data } });
  }

  submitFinalQuote() {
    const payload = {
      ...this.data,
      calculatedPremium: this.premium,
    };

    this.quoteService.submitQuote(payload).subscribe({
      next: () => {
        alert('Quote submitted successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Submit error:', err);
        alert('Failed to submit quote.');
      },
    });
  }
  showBreakdown = false;

toggleBreakdown() {
  this.showBreakdown = !this.showBreakdown;
}

}