import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { InputPatternFilterDirective } from 'src/app/components/input-pattern-filter.directive';

@Component({
  selector: 'app-form-row',
  templateUrl: './form-row.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    InputPatternFilterDirective
  ]
})
export class FormRowComponent implements OnInit {
  public formRowFormGroup!: UntypedFormGroup;
  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit() {
    if (this.controlContainer.control) {
      this.formRowFormGroup = this.controlContainer.control as UntypedFormGroup;
    }
  }

}
