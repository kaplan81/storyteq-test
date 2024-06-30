import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoutedComponents } from '@vehicles/app/enums';
import { TitleMixin, emptyBase } from '@vehicles/app/mixins';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  standalone: true,
  styleUrl: './cars.component.scss',
  templateUrl: './cars.component.html',
})
export class CarsComponent extends TitleMixin(
  emptyBase,
  RoutedComponents[RoutedComponents.cars].toUpperCase(),
  true
) {}
