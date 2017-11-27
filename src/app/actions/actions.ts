import {Action} from "@ngrx/store";
import {Task} from "../models/Task";
import {TaskListResponse} from "../models/TaskListResponse";


export const ADD_TASK =             'Add Task';
export const ADD_TASK_SUCCESS =     'Add Task Success';
export const ADD_TASK_FAIL =        'Add Task Fail';
export const EDIT_TASK = 'Edit Task';
export const EDIT_TASK_SUCCESS = 'Edit Task Success';
export const EDIT_TASK_ERROR = 'Edit Task Error';
export const LOAD_TASKS =                 'Load Tasks';
export const LOAD_TASKS_SUCCESS =         'Load Tasks Success';
export const LOAD_TASKS_FAIL =            'Load Tasks Fail';
export const SEARCH_TASKS = 'Get Tasks';
export const SEARCH_TASKS_SUCCESS = 'Get Tasks Fail';
export const SEARCH_TASKS_ERROR = 'Get Tasks Fail';
export const LOGIN = 'Login';
export const LOGIN_SUCCESS = 'Login success';
export const LOGIN_ERROR = 'Login error';
export interface SearchTasksPayload {
  sort_field?: string,
  sort_direction?: string,
  page?: number
}


export class AddTaskAction implements Action{
  readonly type = ADD_TASK;

  constructor(public payload: Map<string,any>) { }
}

export class AddTaskSuccessAction implements Action {
  readonly type = ADD_TASK_SUCCESS;

  constructor(public payload: Task) { }
}

export class AddTaskFailAction implements Action {
  readonly type = ADD_TASK_FAIL;
  constructor (public payload: string){};
}


export class LoadTasksAction implements Action {
  readonly type = LOAD_TASKS;
}

export class LoadTasksSuccessAction implements Action {
  readonly type = LOAD_TASKS_SUCCESS;
  constructor(public payload: TaskListResponse) {

  }
}

export class LoadTasksFailAction implements Action {
  readonly type = LOAD_TASKS_FAIL;
  constructor(public payload: string) {

  }
}

export class SearchTasksAction implements Action {
  readonly type = SEARCH_TASKS;
  constructor(public payload:SearchTasksPayload){

  }
}

export class SearchTasksSuccessAction implements Action {
  readonly type = SEARCH_TASKS_SUCCESS;
  constructor(public payload:any) {

  }
}

export class SearchTasksErrorAction implements Action {
  readonly type = SEARCH_TASKS_SUCCESS;
  constructor(public payload:string) {

  }
}

export class LoginAction implements Action {
  readonly type = LOGIN;
  constructor(public payload:any){

  }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
}

export class LoginErrorAction implements Action {
  readonly  type = LOGIN_ERROR;
  constructor(public payload:string){

  }
}

export class EditTaskAction implements Action {
  readonly type = EDIT_TASK;
  constructor(public payload:any){

  }
}

export class EditTaskSuccessAction implements Action {
  readonly type = EDIT_TASK_ERROR;
  constructor(public payload:any){

  }
}

export class EditTaskErrorAction implements Action {
  readonly type = EDIT_TASK_ERROR;
  constructor(public payload:string){

  }
}

export type Actions
  = AddTaskAction
  | AddTaskSuccessAction
  | AddTaskFailAction
  | LoadTasksAction
  | LoadTasksSuccessAction
  | LoadTasksFailAction
  | SearchTasksAction
  | SearchTasksSuccessAction
  | SearchTasksErrorAction
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | EditTaskAction
  | EditTaskSuccessAction
  | EditTaskErrorAction;
