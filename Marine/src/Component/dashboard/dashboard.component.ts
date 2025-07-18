
import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  signal,
  effect
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chart, ChartOptions, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  lineChart!: Chart;

  // Dashboard stats
  totalQuotes: number = 128;
  activeClients: number = 34;
  pendingBinds: number = 6;

  // Data
  recentActivities: string[] = [
    'New quote submitted by John Doe',
    'Policy bound for Jane Smith',
    'Quote edited by broker #2873',
    'Uploaded proof of ownership',
  ];

  recentQuotes = [
    { client: 'John Doe', property: '123 River St.', date: 'Apr 18', status: 'Pending', premium: 650 },
    { client: 'Sarah Lane', property: '88 Ocean View', date: 'Apr 17', status: 'Bound', premium: 480 },
  ];

  // Filter for the dropdown
  selectedFilter: string = 'year'; // default filter

  constructor() {}

  ngOnInit(): void {
    // Initial filter chart render is handled in ngAfterViewInit
  }

  ngAfterViewInit(): void {
    this.renderLineChart(this.selectedFilter); // Render chart with initial filter
  }

  onFilterChange(): void {
    this.updateChartData(this.selectedFilter);
  }

  renderLineChart(filter: string): void {
    const ctx = this.lineChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const { labels, data } = this.getChartData(filter);

    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Monthly Quote Activity',
          data,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#fff',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#1e293b'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#475569'
            }
          },
          y: {
            ticks: {
              color: '#475569'
            }
          }
        }
      } as ChartOptions
    });
  }

  updateChartData(filter: string): void {
    const { labels, data } = this.getChartData(filter);
    if (this.lineChart) {
      this.lineChart.data.labels = labels;
      this.lineChart.data.datasets[0].data = data;
      this.lineChart.update();
    }
  }

  getChartData(filter: string): { labels: string[]; data: number[] } {
    switch (filter) {
      case '6months':
        return {
          labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
          data: [180, 220, 300, 250, 270, 290]
        };
      case 'month':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [60, 80, 45, 100]
        };
      case 'year':
      default:
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [120, 190, 300, 250, 280, 320]
        };
    }
  }
}
