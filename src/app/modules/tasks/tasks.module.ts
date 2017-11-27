import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {TaskListComponent} from "./components/taskList/taskList.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TaskFormComponent} from "./components/taskForm/taskForm.component";
import {FormsModule} from "@angular/forms";
import {ImageUploadModule} from "ng2-imageupload";
import {TaskPreviewModalComponent} from "./components/taskPreviewModal/taskPreviewModal.component";
import {TaskEditModalComponent} from "./components/taskEditModal/taskEditModal.component";

@NgModule({
  imports: [
    BrowserModule,
    NgxDatatableModule,
    ImageUploadModule,
    FormsModule
  ],
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskPreviewModalComponent,
    TaskEditModalComponent
  ],
  entryComponents: [
    TaskPreviewModalComponent,
    TaskEditModalComponent
  ],
  exports: [
    TaskListComponent,
    TaskFormComponent,
    TaskPreviewModalComponent,
    TaskEditModalComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TasksModule {
}
