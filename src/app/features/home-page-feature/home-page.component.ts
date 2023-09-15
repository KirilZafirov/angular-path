import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormsModule, ReactiveFormsModule, UntypedFormGroup, FormControl } from '@angular/forms';
import { Subject, tap } from 'rxjs'; 
import { ChildHomePageComponent } from './components/child.component';
import { FormRowComponent } from './components/form-row.component';

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
    ChildHomePageComponent,
    FormRowComponent,
    JsonPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  testValues = [1, 2];

  @ViewChild(TemplateRef, { read: ViewContainerRef })
  private templateViewContainerRef!: ViewContainerRef;
  constructor(private formBuilder: FormBuilder, private readonly componentFactoryResolver: ComponentFactoryResolver) {

    const formControlData = this.files ?
      this.getNewFormArray(this.files) : new FormArray([this.getNewItemControl(null)]);


    this.dynamicForm = this.formBuilder.group({
      items: formControlData,
      vehicleType:  this.getNewItemControl(null),
      categoryType: this.getNewItemControl(null)
    });


  }


  ngOnInit() {
    const vehicleType = this.dynamicForm.get('vehicleType')?.valueChanges.pipe(
      tap((value) => {
        if(value) {
          const control = this.dynamicForm.get('categoryType') as any;
          control?.controls['name'].patchValue(value.name);
        }
      })
    );
    const categoryType = this.dynamicForm.get('categoryType')?.valueChanges.pipe();
    const items = this.dynamicForm.get('items')?.valueChanges.pipe();


  }
  get vehicleType() { return this.formItems['vehicleType'] as any; }
  get categoryType() { return this.formItems['categoryType'] as any; }

  increase() {
    this.testValues[0] = this.testValues[0] + 1;
  };
 
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
 
 