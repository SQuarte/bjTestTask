import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'bj-task-preview-modal',
  templateUrl: './taskPreviewModal.tmpl.html'
})


export class TaskPreviewModalComponent {
  @Input() task: any;
  constructor(public activeModal: NgbActiveModal) {}
}
