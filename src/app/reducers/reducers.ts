import {Task} from "../models/Task";
import * as actions from '../actions/actions';


const DEFAULT_LIMIT = 3;
export interface State {
  tasks: Task[];
  totalTasks: number,
  limit: number,
  page: number,
  sortField: string,
  sortDirection: string,
  isLogin: boolean
  hasError: boolean
  errors:any[]
}

export const initialState: State = {
  tasks: [],
  totalTasks: 0,
  limit: DEFAULT_LIMIT,
  page: 0,
  sortField: '',
  sortDirection: '',
  isLogin: false,
  hasError: false,
  errors:[]
};

export const tasks = (state:State = initialState,action:actions.Actions) => {
  switch (action.type) {
    case actions.LOAD_TASKS_SUCCESS: {
      return {
        tasks: action.payload.tasks,
        limit: DEFAULT_LIMIT,
        totalTasks: action.payload.total_task_count,
        page: 0,
        sortField: null,
        sortDirection: null,
        isLogin:state.isLogin,
        hasError:false,
        errors: []
      };
    }
    case actions.SEARCH_TASKS_SUCCESS: {
      return {
        tasks: action.payload.response.tasks,
        limit: DEFAULT_LIMIT,
        totalTasks: action.payload.response.total_task_count,
        page: action.payload.search.page,
        sortField: action.payload.search.sort_field || state.sortField,
        sortDirection: action.payload.search.sort_direction || state.sortDirection,
        isLogin:state.isLogin,
        hasError:false,
        errors: []
      }
    }
    case actions.SEARCH_TASKS_ERROR: {
      return {
        tasks: state.tasks.slice(),
        limit: DEFAULT_LIMIT,
        totalTasks: state.totalTasks,
        page: state.page,
        sortField: state.sortField,
        sortDirection: state.sortDirection,
        isLogin: false,
        hasError: true,
        errors: [action.payload]
      }
    }
    case actions.LOGIN_SUCCESS: {
      return {
        tasks: state.tasks.slice(),
        limit: DEFAULT_LIMIT,
        totalTasks: state.totalTasks,
        page: state.page,
        sortField: state.sortField,
        sortDirection:  state.sortDirection,
        isLogin: true,
        hasError:false,
        errors: []
      }
    }
    case actions.LOGIN_ERROR:
    case actions.LOAD_TASKS_FAIL:
    case actions.ADD_TASK_FAIL:
    case actions.EDIT_TASK_ERROR:{
      return {
        tasks: state.tasks.slice(),
        limit: DEFAULT_LIMIT,
        totalTasks: state.totalTasks,
        page: state.page,
        sortField: state.sortField,
        sortDirection: state.sortDirection,
        isLogin: state.isLogin,
        hasError: true,
        errors: [action.payload]
      }
    }
    default:
      return state;
  }
};

