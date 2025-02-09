import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  template: `
    <input 
      type="date" 
      (change)="onDateChange($event)" 
      class="w-full"
    >
  `
})


export class DatepickerComponent {
  @Output() dateSelected = new EventEmitter<string>();

  onDateChange(event: any) {
    this.dateSelected.emit(event.target.value);
  }
}
