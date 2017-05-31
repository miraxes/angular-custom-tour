import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app'

function main(): Promise<any> {

  if ('prod' === process.env.ENV) {
    // Production
    enableProdMode()

  }

  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => {
      console.log(err)
    })
}

document.addEventListener('DOMContentLoaded', () => main())
