import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-myclients',
  templateUrl: './myclients.component.html',
  styleUrls: ['./myclients.component.css'],
  imports:[CommonModule,RouterModule]
})
export class MyclientsComponent implements OnInit {
  // clients: any[] = [];
  clients = [
    {
      name: 'Alice Johnson',
      address: '123 Oceanview Blvd, Miami, FL',
      pan: 'ABCDE1234F',
      phone: '+1 305-123-4567',
      email: 'alice@example.com'
    },
    {
      name: 'Brian Smith',
      address: '456 Seashore Ave, San Diego, CA',
      pan: 'BNSMT5678G',
      phone: '+1 619-555-8901',
      email: 'brian@example.com'
    },
    {
      name: 'Carla Gomez',
      address: '789 Coastal Rd, Galveston, TX',
      pan: 'CGMZ8901H',
      phone: '+1 409-222-3344',
      email: 'carla@example.com'
    },
    {
      name: 'David Lee',
      address: '101 Coral Reef Dr, Key West, FL',
      pan: 'DLEE4321J',
      phone: '+1 786-101-2020',
      email: 'david@example.com'
    },
    {
      name: 'Emma Brown',
      address: '202 Harbor Ln, Charleston, SC',
      pan: 'EMBR1234K',
      phone: '+1 843-333-7777',
      email: 'emma@example.com'
    }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.http.get<any[]>('/api/clients').subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error fetching clients:', err)
    });
  }
}
