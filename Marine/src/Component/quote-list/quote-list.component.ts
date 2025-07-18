import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class QuoteListComponent {
  quotes = [
    { quoteId: 101, applicantName: 'John Doe', quoteAmount: 5000, dateCreated: new Date('2024-04-01'), deleted: false },
    { quoteId: 102, applicantName: 'Alice Smith', quoteAmount: 7500, dateCreated: new Date('2024-03-28'), deleted: false },
    { quoteId: 103, applicantName: 'Michael Brown', quoteAmount: 6200, dateCreated: new Date('2024-03-30'), deleted: false }
  ];

  searchText: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  filteredQuotes = [...this.quotes];

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {
    this.loadQuotes();
  }

  loadQuotes() {
    const storedQuotes = localStorage.getItem('quoteList');
    if (storedQuotes) {
      const parsedQuotes = JSON.parse(storedQuotes);
      this.quotes = [...this.quotes, ...parsedQuotes]; // Append stored quotes
    }
    this.filteredQuotes = [...this.quotes]; // Update displayed list
  }

  viewQuote(quoteId: number) {
    this.router.navigate(['/quote', quoteId]);
  }

  editQuote(quoteId: number) {
    this.router.navigate(['/quote/edit', quoteId]);
  }

  softDeleteQuote(quoteId: number) {
    const quote = this.quotes.find(q => q.quoteId === quoteId);
    if (quote) {
      quote.deleted = true;
      localStorage.setItem('quoteList', JSON.stringify(this.quotes.filter(q => q.quoteId >= 104))); // Save only new quotes
    }
    this.filterQuotes();
  }

  filterQuotes() {
    const search = this.searchText.toLowerCase();
    this.filteredQuotes = this.quotes.filter(q => 
      q.applicantName.toLowerCase().includes(search) || 
      q.quoteId.toString().includes(search) ||
      q.quoteAmount.toString().includes(search) ||
      q.dateCreated.toISOString().includes(search)
    );
  }

  sortQuotes(column: 'quoteId' | 'applicantName' | 'quoteAmount' | 'dateCreated') {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredQuotes = [...this.filteredQuotes].sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      return this.sortDirection === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

    this.cdRef.detectChanges(); // Force UI update
  }
}
