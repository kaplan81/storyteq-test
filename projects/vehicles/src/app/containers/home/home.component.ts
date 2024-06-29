import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoutedComponents } from '../../enums/routed.enum';
import { emptyBase } from '../../mixins/empty';
import { TitleMixin } from '../../mixins/title.mixin';

// export interface HomeComponent extends TitledComponent {}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  standalone: true,
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent extends TitleMixin(
  emptyBase,
  RoutedComponents[RoutedComponents.home].toUpperCase(),
  true
) {}
