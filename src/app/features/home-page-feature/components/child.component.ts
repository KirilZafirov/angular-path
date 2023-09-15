
import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'app-child',
  template: `
  Numbers
  <ng-container *ngFor="let number of numbers">
{{number}}
</ng-container>
  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgFor
  ]
})
export class ChildHomePageComponent {
  @Input( ) numbers: number[] = []; 
}
