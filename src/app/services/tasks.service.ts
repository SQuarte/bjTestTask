import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {URLSearchParams} from "@angular/http";
import {BaseHttpService} from "./baseHttp.service";
import {TaskListResponse} from "../models/TaskListResponse";
import {isNullOrUndefined} from "util";
import {Md5} from 'ts-md5/dist/md5';
@Injectable()
export class TasksService {

  private TOKEN = 'beejee';
  constructor(public http:BaseHttpService) {
  }


  getTasks():Observable<any>  {
    return this.http.get('');
  }

  searchTasks(page:number, searchField?: string, searchDirection?: string):Observable<TaskListResponse> {
    let params:URLSearchParams = new URLSearchParams();
    params.set('page','' + (page || 0));
    if (searchField) {
      params.set('sort_field',searchField);
    }
    if (searchDirection) {
      params.set('sort_direction',searchDirection);
    }
    return this.http.get('',params)
  }

  addTask(formData:Map<string,any>):Observable<any> {
    return this.http.post('/create',formData);
  }


  editTask(id:number,text:string,status:number) {
    let body = new Map<string,any>();
    if (!isNullOrUndefined(text)) {
      body.set('text',text);
    }
    if (!isNullOrUndefined(status)) {
      body.set('status',status);
    }
    body.set('token',this.TOKEN);
    body.set('signature',this.createSignature(text,status));
    return this.http.post('edit/' + id,body);
  }


  private createSignature(text,status) {
    let params = [];
    if (!isNullOrUndefined(status)) {
      params.push('status=' + status);
    }
    if (!isNullOrUndefined(text)) {
      params.push('text=' + text);
    }
    params.push('token=' + this.TOKEN);
    let paramString = params.join('&');
    return Md5.hashStr(paramString);
  }


}
