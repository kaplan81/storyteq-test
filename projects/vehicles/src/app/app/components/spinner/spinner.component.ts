import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'teq-spinner',
  standalone: true,
  imports: [],
  templateUrl: 'spinner.component.html',
  styleUrl: 'spinner.component.scss',
})
export class SpinnerComponent {}
