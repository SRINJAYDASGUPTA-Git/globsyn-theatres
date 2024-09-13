import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrl: './add-schedule.component.css'
})
export class AddScheduleComponent implements OnInit {
  scheduleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.scheduleForm = this.fb.group({
      date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      movie: ['', Validators.required],
      screen: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      // Handle form submission
      console.log('Form Data:', this.scheduleForm.value);
    }
  }
}
