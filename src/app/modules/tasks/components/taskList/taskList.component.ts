import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import {AppState} from './app.service';
import {Task} from "src/app/models/Task";
import {SearchTasksPayload} from "../../../../actions/actions";

@Component({
  selector: 'bj-tasks-list',
  templateUrl: './taskList.tmpl.html'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() totalTasks: number = 0;
  @Input() page: number = 0;
  @Input() limit: number = 0;
  @Input() editable: false;
  @Output() onSearch = new EventEmitter<SearchTasksPayload>();
  @Output() onEditTask = new EventEmitter<Task>();

  constructor() {
  }

  setPage(pageInfo) {
    this.onSearch.emit({
      page: pageInfo.offset
    })
  }

  onSort(sortInfo) {
    this.onSearch.emit(
      {'sort_field': sortInfo.column.name,
              'sort_direction':sortInfo.newValue}
    )
  }

  editTask(taskId) {
    this.onEditTask.emit(this.tasks.find((task) => task.id == taskId));
  }
}
