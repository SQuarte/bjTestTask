import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'bj-task-edit-modal',
  templateUrl: './taskEditModal.tmpl.html'
})


export class TaskEditModalComponent {
  @Input() task: any;

  constructor(public activeModal: NgbActiveModal) {}
}
