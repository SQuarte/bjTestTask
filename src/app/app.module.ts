import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import {
  NgModule,
  ApplicationRef, CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import {APP_RESOLVER_PROVIDERS} from "./app.resolver";
import {AppState, InternalStateType} from "./app.service";
import {AppComponent} from "./app.component";
import {TasksModule} from "./modules/tasks/tasks.module";
import {ROUTES} from "./app.routes";
import {ENV_PROVIDERS} from "./environment";
import {AppStoreModule} from "./store";
import {EffectsModule} from "@ngrx/effects";
import {TasksEffects} from "./effects/effects";
import {HomeComponent} from "./components/home/home.component";
import {NoContentComponent} from "./components/no-content/no-content.component";
import {TasksService} from "./services/tasks.service";
import {BaseHttpService} from "./services/baseHttp.service";
import {ImageUploadModule} from "angular2-image-upload";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "./components/login/login.component";

/*
 * Platform and Environment providers/directives/pipes
 */

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NoContentComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TasksModule,
    AppStoreModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    EffectsModule.forRoot([TasksEffects]),
    ImageUploadModule.forRoot()
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    BaseHttpService,
    TasksService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
