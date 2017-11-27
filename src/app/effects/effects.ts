import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import * as actions from '../actions/actions';
import {of} from 'rxjs/observable/of';
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action, Store} from "@ngrx/store";
import {TasksService} from "../services/tasks.service";
import {TaskListResponse} from "../models/TaskListResponse";
import {State} from "../reducers/reducers";
import {SearchTasksPayload} from "../actions/actions";
import {isNullOrUndefined} from "util";

@Injectable()
export class TasksEffects {

  @Effect()
  loadTasks$: Observable<Action> = this.actions$
    .ofType(actions.LOAD_TASKS)
    .startWith(new actions.LoadTasksAction())
    .switchMap(() => this.tasksService
      .getTasks()
      .map((tasks: TaskListResponse) => new actions.LoadTasksSuccessAction(tasks))
      .catch(error => of(new actions.LoadTasksFailAction(JSON.stringify(error.error))))
    );


  @Effect()
  addTask$: Observable<Action> = this.actions$
    .ofType(actions.ADD_TASK)
    .map((action: actions.AddTaskAction) => action.payload)
    .switchMap((formData) => this.tasksService.addTask(formData)
      .map((task) => new actions.AddTaskSuccessAction(task))
      .map((action) => new actions.SearchTasksAction({}))
      .catch(error => of(new actions.AddTaskFailAction(JSON.stringify(error.error))))
    );


  @Effect()
  searchTasks$: Observable<Action> = this.actions$
    .ofType(actions.SEARCH_TASKS)
    .withLatestFrom(this.store$)
    .switchMap(([a, s]) => {
        //typescript bug-cant define type of params
        let action: any = a;
        let store: any = s;
        let search: SearchTasksPayload = {
          page: isNullOrUndefined(action.payload.page) ? store.tasks.page : action.payload.page,
          sort_field: isNullOrUndefined(action.payload.sort_field) ? store.tasks.sortField : action.payload.sort_field,
          sort_direction: isNullOrUndefined(action.payload.sort_direction) ? store.tasks.sortDirection : action.payload.sort_direction
        };
        return this.tasksService.searchTasks(search.page + 1, search.sort_field, search.sort_direction)
          .map((tasks: TaskListResponse) => new actions.SearchTasksSuccessAction({response: tasks, search: search}))
          .catch(error => of(new actions.SearchTasksErrorAction(JSON.stringify(error.error))))
      }
    );

  @Effect()
  performLogin$: Observable<Action> = this.actions$
    .ofType(actions.LOGIN)
    .map((action: actions.LoginAction) => action.payload)
    .switchMap((payload) => {
      if (payload.username === 'admin' && payload.password === '123') {
        return Observable.of(new actions.LoginSuccessAction());
      } else {
        return Observable.of(new actions.LoginErrorAction('login or password not correct'))
      }
    });


  @Effect()
  editTask$: Observable<Action> = this.actions$
    .ofType(actions.EDIT_TASK)
    .map((action: actions.EditTaskAction) => action.payload)
    .switchMap((payload) => this.tasksService.editTask(payload.id, payload.text, payload.status)
      .map(() => new actions.EditTaskSuccessAction({}))
      .map(() => new actions.SearchTasksAction({}))
      .catch(error => of(new actions.EditTaskErrorAction(JSON.stringify(error.error))))
    );


  constructor(private actions$: Actions, private store$: Store<State>, private tasksService: TasksService) {
  }

}
