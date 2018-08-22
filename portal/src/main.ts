import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err))

const DevExpress = require('devextreme/bundles/modules/core')
const ui = DevExpress.ui = require('devextreme/bundles/modules/ui')
ui.dialog = require('devextreme/ui/dialog')
