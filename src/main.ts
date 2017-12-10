import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  // Google Analytics
  var gAnalyticsScriptSrc = document.createElement('script');
  gAnalyticsScriptSrc.async = true;
  gAnalyticsScriptSrc.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.GOOGLEANALYTICS_TRACKINGID;
  
  var gAnalyticsScript = document.createElement('script');
  gAnalyticsScript.text = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());
  
  gtag('config', '${environment.GOOGLEANALYTICS_TRACKINGID}');`;
  
  //document.head.insertBefore(gAnalyticsScript, document.head.firstChild);
  //document.head.insertBefore(gAnalyticsScriptSrc, document.head.firstChild);

  document.head.appendChild(gAnalyticsScriptSrc);
  document.head.appendChild(gAnalyticsScript);

}

window['gMapsLoaded'] = new Promise((resolve, reject) => {
  var gMapsScript = document.createElement('script');
  gMapsScript.src = 'https://maps.googleapis.com/maps/api/js?libraries=geometry&key=' + environment.GMAPS_API_KEY;
  gMapsScript.onload = () => {
    resolve();
  }
  document.body.appendChild(gMapsScript);
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
