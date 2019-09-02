import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
