import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleMixin, emptyBase } from '@vehicles/app/mixins';
import { TitledComponent } from '@vehicles/app/models';

/**
 * Tell ngc about new properties.
 */
export interface AppComponent extends TitledComponent {}
@Component({
  selector: 'teq-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
})
export class AppComponent extends TitleMixin(emptyBase, 'Cars“R”Us') {}
