import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import * as actions from '../../actions/actions';
import {Store} from "@ngrx/store";
import {State} from "../../reducers/reducers";
import {SearchTasksPayload} from "../../actions/actions";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskPreviewModalComponent} from "../../modules/tasks/components/taskPreviewModal/taskPreviewModal.component";
import {TaskEditModalComponent} from "../../modules/tasks/components/taskEditModal/taskEditModal.component";

@Component({
  selector: 'ts-start-page',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
/*  changeDetection: ChangeDetectionStrategy.OnPush,*/
})
export class HomeComponent {
  public state:State;
  constructor(private store: Store<any>, private modalService: NgbModal) {
    store.select('tasks').subscribe((state) =>{
      this.state = state;
      if (this.state.hasError) {
        alert(this.state.errors.join(' '))
      }
    });
  }

  addTask(formData) {
    this.store.dispatch(new actions.AddTaskAction(formData))
  }

  searchTasks(searchParams:SearchTasksPayload) {
    this.store.dispatch(new actions.SearchTasksAction(searchParams))
  }

  previewTask(task) {
    const modRef = this.modalService.open(TaskPreviewModalComponent);
    modRef.componentInstance.task = task;
  }

  editTask(task) {
    const modRef = this.modalService.open(TaskEditModalComponent);
    modRef.componentInstance.task = Object.assign({},task);
    modRef.result.then((result) => this.store.dispatch(new actions.EditTaskAction(result)))
  }
}
