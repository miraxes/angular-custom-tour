import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ShareModule } from '../share'
import { AppComponent } from './component'

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShareModule
  ]
})
export class AppModule {

}
