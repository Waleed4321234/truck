import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-job-application',
  standalone: true,
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
  imports: [CommonModule, FormsModule],
})
export class JobApplicationComponent {
  formData = { name: '', email: '', phone: '', position: '' }; // Store form values
  successMessage = '';
  isSubmitting = false; // Prevents multiple submissions

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.isSubmitting) return; // Prevents duplicate submissions
    this.isSubmitting = true;

    const templateParams = {
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
      position: this.formData.position,
    };

    emailjs
      .send('service_p1lgdik', 'template_txoi1ff', templateParams, '1KbO9u9XNM64K-8BJ')
      .then(response => {
        console.log('✅ SUCCESS!', response.status, response.text);
        this.successMessage = '✅ Application submitted successfully!';
        this.formData = { name: '', email: '', phone: '', position: '' }; // Clear form fields
        setTimeout(() => this.router.navigate(['/']), 2000);
      })
      .catch(error => {
        console.error('❌ Failed...', error);
        alert('⚠️ There was a problem submitting the form. Please try again.');
      })
      .finally(() => {
        this.isSubmitting = false; // Re-enable button after submission
      });
  }
}
