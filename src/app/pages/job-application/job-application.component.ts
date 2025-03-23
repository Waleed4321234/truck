import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-application',
  standalone: true,
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
  imports: [CommonModule, FormsModule],
})
export class JobApplicationComponent {
  formData = { name: '', email: '', phone: '', position: '' }; // ✅ Store form values
  successMessage = '';
  isSubmitting = false; // ✅ Prevents multiple submissions

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.isSubmitting) return; // ✅ Prevents duplicate submissions
    this.isSubmitting = true;

    const data = new FormData();
    data.append('name', this.formData.name);
    data.append('email', this.formData.email);
    data.append('phone', this.formData.phone);
    data.append('position', this.formData.position);

    // Hidden FormSubmit fields
    data.append('_next', 'https://libratruckrepair.com/');
    data.append('_captcha', 'false');

    fetch('https://api.formsubmit.co/ajax/wadhah@libratruckrepair.com', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.success) {
        this.successMessage = '✅ Application submitted successfully!';
        this.formData = { name: '', email: '', phone: '', position: '' }; // ✅ Clear form fields
        setTimeout(() => this.router.navigate(['/']), 2000);
      } else {
        alert('⚠️ Form submission failed: ' + responseData.message);
      }
    })
    .catch(error => {
      console.error('❌ Error:', error);
      alert('⚠️ There was a problem submitting the form. Please try again later.');
    })
    .finally(() => {
      this.isSubmitting = false; // ✅ Re-enable button after submission
    });
  }
}
