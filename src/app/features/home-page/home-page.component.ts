import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormsModule, ReactiveFormsModule, UntypedFormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomePageComponent {

  dynamicForm: UntypedFormGroup;

  checkAllControl = new FormControl(false, []);
  destroy$ = new Subject();

  testFIle = {
    name: 'file1',
    project: 'project1',
    legalEntity: 'legalEntity1',
    workItems: [],
    documentType: 'documentType1',
    documentStatus: 'documentStatus1',
    taxYear: 'taxYear1',
    taxPeriod: 'taxPeriod1',
    referenceId: 'referenceId1',
  }
  files = [
    {
      name: 'file1',
      project: 'project1',
      legalEntity: 'legalEntity1',
      workItems: [],
      documentType: 'documentType1',
      documentStatus: 'documentStatus1',
      taxYear: 'taxYear1',
      taxPeriod: 'taxPeriod1',
      referenceId: 'referenceId1',
    },
    {
      name: 'file2',
      project: 'project2',
      legalEntity: 'legalEntity2',
      workItems: [],
      documentType: 'documentType2',
      documentStatus: 'documentStatus2',
      taxYear: 'taxYear2',
      taxPeriod: 'taxPeriod2',
      referenceId: 'referenceId2',
    }
  ]
  constructor(private formBuilder: FormBuilder) {

    const formControlData = this.files ?
      this.getNewFormArray(this.files) : new FormArray([this.getNewItemControl(null)]);


    this.dynamicForm = this.formBuilder.group({
      items: formControlData
    });
  }

  getNewFormArray(items: any) {
    return new FormArray(items.map((e: any) => this.getNewItemControl(e)))
  }

  changeSelectionForAll() {
    (this.dynamicForm.controls['items'] as any).controls.forEach((control: FormControl) => {
      if (control) {
        control.get('checked')?.patchValue(this.checkAllControl.value);
      }
    })
  }
  getNewItemControl(item: any | null) {
    if (item) {
      return this.formBuilder.group({
        name: [item.name, Validators.required],
        project: [],
        legalEntity: [],
        workItems: [],
        documentType: [],
        documentStatus: [],
        taxYear: [],
        taxPeriod: [],
        referenceId: [],
        checked: []
      });
    } else {
      return this.formBuilder.group({
        name: [],
        project: [],
        legalEntity: [],
        workItems: [],
        documentType: [],
        documentStatus: [],
        taxYear: [],
        taxPeriod: [],
        referenceId: [],
        checked: []
      });
    }
  }

  remove(i: any) {
    this.items.removeAt(i);
  };

  addNewItem() {
    this.items.push(this.getNewItemControl(this.testFIle));
  };

  // convenience getters for easy access to form fields
  get formItems() { return this.dynamicForm.controls; }
  get items() { return this.formItems['items'] as any; }



  onSubmit() {

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
  }



  onReset() {
    // reset whole form back to initial state 
    this.dynamicForm.reset();
    this.items.clear();
  }


}
