import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { QuoteService } from '../../app/services/quote.service';


@Component({
  selector: 'app-quoteform',
  templateUrl: './quoteform.component.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  styleUrls: ['./quoteform.component.css']
})

export class QuoteformComponent implements OnInit, OnDestroy {
  
  quoteForm!: FormGroup;
  currentStep = 1;
  totalSteps = 9;
  selectedPlan = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    private router: Router
  ) {}

  get progress(): number {
    return Math.round((this.currentStep - 1) / (this.totalSteps - 1) * 100);
  }

  coveragePlans = [
    { name: 'Silver', benefits: ['Basic coverage'] },
    { name: 'Gold', benefits: ['Basic coverage', 'Theft protection'] },
    { name: 'Premium', benefits: ['All Gold benefits', 'Natural disaster coverage'] },
  ];

  stepFields: string[] = [
    '', // index 0 not used
    'brokerDetails', 'homeownerDetails', 'foundationType', 'propertyDetails',
    'propertyInfo', 'constructionDetails', 'storiesDetails', 'homeTypeDetails', 'garageDetails'
  ];

  ngOnInit(): void {
    this.quoteForm = this.fb.group({
      brokerDetails: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        BrokerID: ['', Validators.required],
      }),
      homeownerDetails: this.fb.group({
        name: ['', Validators.required],
        contact: ['', Validators.required],
        pan: ['', Validators.required],
        dob: ['', Validators.required],
        aadhaar: ['', Validators.required],
      }),
      foundationType: this.fb.group({
        type: ['', Validators.required],
      }),
      propertyDetails: this.fb.group({
        address: ['', Validators.required],
        floodZone: ['', Validators.required],
        size: ['', Validators.required],
        proofOfOwnership: [null],
      }),
      propertyInfo: this.fb.group({
        yearBuilt: ['', Validators.required],
        sqft: ['', Validators.required],
        elevation: ['', Validators.required],
        floors: ['', Validators.required],
        constructionType: ['', Validators.required],
      }),
      homeUsage: this.fb.group({
        usageType: ['', Validators.required],
      }),
      coverageDetails: this.fb.group({
        buildingCoverage: ['', Validators.required],
        personalProperty: ['', Validators.required],
        deductible: ['', Validators.required],
        selectedPlan: ['']
      }),
      constructionDetails: this.fb.group({
        type: ['', Validators.required]
      }),
      storiesDetails: this.fb.group({
        count: ['', Validators.required]
      }),
      homeTypeDetails: this.fb.group({
        type: ['', Validators.required]
      }),
      garageDetails: this.fb.group({
        type: ['', Validators.required]
      }),
    });
  }

  next(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  back(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm(): void {
    if (this.quoteForm.valid) {
      console.log("Form Submitted:", this.quoteForm.value);
      // TODO: Send to backend or trigger save logic
    } else {
      this.quoteForm.markAllAsTouched(); // highlights validation errors
    }
  }

  submitQuote(): void {
    if (this.quoteForm.valid) {
      console.log('Quote Submitted:', this.quoteForm.value);
      // TODO: Replace console log with actual API call
    } else {
      alert("Please fill out all required fields.");
      this.quoteForm.markAllAsTouched();
    }
  }

  get propertyDetailsGroup(): FormGroup {
    return this.quoteForm.get('propertyDetails') as FormGroup;
  }

  selectOption(group: string, field: string, value: any): void {
    this.quoteForm.get(group)?.get(field)?.setValue(value);
    const autoNextFields = ['constructionType', 'numberOfStories', 'homeType', 'garageType'];
    if (autoNextFields.includes(field)) {
      setTimeout(() => this.next(), 100);
    }
  }

  selectPlan(plan: string) {
    this.quoteForm.get('coverageDetails.selectedPlan')?.setValue(plan);
  }
  

  selectImageAndNext(path: string, controlPath: string): void {
    this.quoteForm.get(controlPath)?.setValue(path);
    this.next();
  }

  isAutoNextStep(): boolean {
    const autoSteps = ['constructionType', 'numberOfStories', 'homeType', 'garageType'];
    const currentStepField = this.stepFields[this.currentStep];
    return autoSteps.includes(currentStepField);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  calculatePremium() {
    if (this.quoteForm.valid) {
      const formData = this.quoteForm.value;
      this.quoteService.calculatePremium(formData).subscribe(response => {
        this.router.navigate(['/viewquote'], { state: { premiumDetails: response } });
      }, error => {
        console.error('Premium calculation failed:', error);
      });
    }
  }
  
}
