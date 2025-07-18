import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  contactNumber: string = '(844) 442-7684';

  teamMembers = [
    {
      photo: 'flood.jpg',
      name: 'Sarthik Goyal',
      designation: 'Organizing Team Head',
      description: 'Sarthik Goyal serves as the Organizing Team Head and is the cornerstone of our operational excellence. With a remarkable ability to manage large-scale initiatives and ensure seamless coordination, Sarthik is the driving force behind every successful project. His leadership fosters a collaborative environment where ideas thrive, and challenges are met with innovative solutions. Whether its orchestrating complex strategies or nurturing team spirit, Sarthik exemplifies dedication to our mission..'
    },
    {
      photo: 'flood.jpg',
      name: 'Harsh Upadhaya',
      designation: 'Tech Lead',
      description: 'As the Tech Lead, Harsh Upadhaya is the architect of our technological backbone. His expertise in cutting-edge technologies and passion for innovation push the boundaries of whats possible. Harsh leads with a forward-thinking mindset, ensuring that every aspect of our flood insurance portal is robust, efficient, and user-friendly. Whether tackling complex technical challenges or mentoring the development team, Harshs commitment to excellence is unparalleled..'
    },
    {
      photo: 'flood.jpg',
      name: 'Pragya Singh',
      designation: 'Head HR',
      description: 'Pragya Singh, our Head HR, is the heart and soul of our team culture. With a deep understanding of people management, Pragya ensures that every individual in the organization feels valued and empowered. Her proactive approach to fostering a positive work environment has been instrumental in cultivating a motivated and high-performing team. Pragya is passionate about building a community of professionals who share a common goal of delivering exceptional service.'
    }
  ];

  counter = 0;
  size = 800; // Width of a single team card in pixels
  transformStyle = 'translateX(0px)';
  autoSlideInterval: any;

  ngOnInit() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  showAlert(): void {
    alert('Commercial Flood Insurance details coming soon!');
  }

  nextSlide() {
    this.counter = (this.counter + 1) % this.teamMembers.length;
    this.updateTransformStyle();
  }

  prevSlide() {
    this.counter = (this.counter - 1 + this.teamMembers.length) % this.teamMembers.length;
    this.updateTransformStyle();
  }

  updateTransformStyle() {
    this.transformStyle = `translateX(${-this.size * this.counter}px)`;
  }
}
