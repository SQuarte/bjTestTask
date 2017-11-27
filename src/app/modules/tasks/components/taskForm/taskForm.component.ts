import {
  Component, EventEmitter, Input, Output, ViewChild,
} from '@angular/core';
import {ImageUtils} from "../../../../utils/imageUtils";
import {ResizeOptions} from "ng2-imageupload";
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'bj-task-form',
  templateUrl: './taskForm.tmpl.html'
})
export class TaskFormComponent {
  @ViewChild("fileInput") fileInput;
  @Input() model:any = {};
  @Output() onSubmitForm = new EventEmitter<Map<String,any>>();
  @Output() onPreview = new EventEmitter<Map<String,any>>();

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 240,
    resizeMaxWidth: 320
  };

  public image;

  onSubmit() {
    let formData:Map<String,any> = new Map();
    formData.set('username',this.model.userName);
    formData.set('email',this.model.email);
    formData.set('text',this.model.text);
    if (!isNullOrUndefined(this.image)){
      formData.set('image',ImageUtils.dataURItoBlob(this.image.dataURL));
    }
    this.onSubmitForm.emit(formData);
    this.model = {}

  }

  proccessImage(image) {
    this.image = image.resized;
  }

  previewTask() {
    if (this.image) {
      this.model.imageSrc = this.image.dataURL;
    }
    this.onPreview.emit(this.model);
  }


}
