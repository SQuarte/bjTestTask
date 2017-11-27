import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { tasks } from './reducers/reducers'

@NgModule({
  imports: [StoreModule.forRoot({tasks})]
})
export class AppStoreModule {
}
