import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  showForm: boolean = false;

  // Map toggles
  showNewYorkMap: boolean = false;
  showNoidaMap: boolean = false;
  showTorontoMap: boolean = false;

  // FAQ state
  faqs = [
    {
      question: 'How long does it take to get a quote?',
      answer: 'Typically within 24 hours after submitting your details.',
      expanded: false,
    },
    {
      question: 'Can I edit my quote after submitting?',
      answer: 'Yes, as long as it hasn’t been submitted for binding.',
      expanded: false,
    },
    {
      question: 'Do you offer other types of insurance?',
      answer: 'Yes, we also offer commercial, home, and marine coverage.',
      expanded: false,
    },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['Get a Quote', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Toggle maps per location
  toggleMap(location: string): void {
    if (location === 'newYork') {
      this.showNewYorkMap = !this.showNewYorkMap;
    } else if (location === 'noida') {
      this.showNoidaMap = !this.showNoidaMap;
    } else if (location === 'toronto') {
      this.showTorontoMap = !this.showTorontoMap;
    }
  }

  // Toggle FAQ answer visibility
  toggleFaq(index: number): void {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }

  // Contact form submission
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
      alert('Message sent successfully!');
      this.contactForm.reset();
    } else {
      alert('Please complete the form correctly before submitting.');
    }
  }

  // Show/Hide contact form
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  // Navigate to broker signup
  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
