import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Constructor } from '@vehicles/app/mixins/constructor';
import { TitledComponent } from '@vehicles/app/models';

export function TitleMixin<B extends Constructor>(
  Base: B,
  title: string,
  setTitle = false,
): Constructor<TitledComponent> & B {
  return class extends Base {
    #titleService = inject(Title);

    title: string = title;

    constructor(...args: any[]) {
      super();
      if (setTitle) {
        this.#titleService.setTitle(this.title);
      }
    }
  };
}
