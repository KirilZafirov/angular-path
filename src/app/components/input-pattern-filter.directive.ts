import { Directive, HostListener, Input } from '@angular/core'; 

@Directive({
  selector: '[appPatternFilter]',
  standalone: true
})
export class InputPatternFilterDirective {
  @Input('appPatternFilter') regex!: string;

  private allowedKeys = ['Backspace', 'Enter', 'Tab', 'ArrowRight', 'ArrowLeft', 'Home', 'End', 'Delete'];

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const regex = new RegExp(this.regex);

    if (
      !(
        regex.test(event.key) ||
        this.allowedKeys.includes(event.key) ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
      )
    ) {
      event.preventDefault();
    }
    const inputValue = target.value + event.key;
    
    if (
      !(
        regex.test(inputValue) ||
        this.allowedKeys.includes(event.key) ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
      )
    ) {
      event.preventDefault();
    }

  }

  @HostListener('paste', ['$event'])
  onPaste(event: any) {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    const regex = new RegExp(this.regex);
   
      // Get pasted data via clipboard API
  const clipboardData = event.clipboardData || (window as any).clipboardData;
  const pastedData = clipboardData.getData('Text');
debugger;
    if ( !regex.test(inputValue) ) {
      event.preventDefault();
    }
   

  }
}
