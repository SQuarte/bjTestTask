import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import * as actions from '../../actions/actions';
import {Store} from "@ngrx/store";
import {State} from "../../reducers/reducers";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'ts-login-page',
  templateUrl: './login.tmpl.html',
/*  changeDetection: ChangeDetectionStrategy.OnPush,*/
})
export class LoginComponent {
  public username;
  public password;
  constructor(private store: Store<any>, private router: Router) {
    store.select('tasks').subscribe((state:State) => {
      if (state.isLogin) {
        router.navigate(['/'])
      } else if (state.hasError){
        alert(state.errors.join(' '))
      }
    });

  }
  performLogin(){
    this.store.dispatch(new actions.LoginAction({username: this.username, password: this.password}));
  }
}
