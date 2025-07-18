import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-risk-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './risk-calculator.component.html',
  styleUrls: ['./risk-calculator.component.css']
})
export class RiskCalculatorComponent {
  data = {
    elevation: 0,
    distanceFromWater: 0,
    yearBuilt: 2000,
    foundationType: '',
    constructionType: '',
    floodHistory: false
  };

  riskLevel: string = '';
  score: number = 0;
  showResult: boolean = false;
  showModal: boolean = false;

  constructor(private router: Router) {}

  calculateRisk() {
    let score = 0;
  
    // Elevation: Higher elevation reduces risk, score higher for elevation > 50 meters
    score += this.data.elevation >= 10 ? 30 : this.data.elevation >= 20 ? 20 : 10;
  
    // Distance from water: More distance means lower risk
    score += this.data.distanceFromWater > 20 ? 30 : this.data.distanceFromWater > 10 ? 20 : 10;
  
    // Year built: Newer buildings are less likely to have outdated construction techniques
    score += this.data.yearBuilt >= 2000 ? 20 : this.data.yearBuilt > 1990 ? 15 : 10;
  
    // Foundation type: Elevated foundations are less vulnerable
    score += this.data.foundationType === 'Elevated' ? 20 : 10;
  
    // Construction type: Flood-resistant constructions are less vulnerable
    score += this.data.constructionType === 'Flood-resistant' ? 20 : 10;
  
    // Flood history: If there's a flood history, the risk score decreases (penalty)
    if (this.data.floodHistory) score -= 15;
  
    this.score = score;
  
    // Risk classification based on score
    if (score >= 120) {
      this.riskLevel = 'Low Risk';
    } else if (score >= 80) {
      this.riskLevel = 'Moderate Risk';
    } else {
      this.riskLevel = 'High Risk';
    }
  
    this.showResult = true;
  }
  

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
