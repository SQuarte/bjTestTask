import {
  Component,
  ViewEncapsulation
} from '@angular/core';
/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `    
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
}
