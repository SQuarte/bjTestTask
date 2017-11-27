import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';

@Injectable()
export class BaseHttpService {

  private BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/';
  private USER_NAME = 'egorkhober';

  constructor(private http: Http) {
  }

  get(url: string, params?: URLSearchParams) {
    if (isNullOrUndefined(params)) params = new URLSearchParams();
    params.set('developer', this.USER_NAME);
    return this.http.get(this.BASE_URL + url, {search: params})
      .map((res) => res.json())
      .map((result: any) => {
        if (result.status === 'ok') {
          return result.message;
        } else {
          throw Observable.throw(result.message)
        }
      });
  }


  post(url: string, body: Map<string, any>) {
    return this.http.post(this.BASE_URL + url + '/?developer=egorkhober', this.convertMapToFormData(body))
      .map((res) => res.json())
      .map((result: any) => {
        if (result.status === 'ok') {
          return result.message;
        } else {
          throw Observable.throw(result.message)
        }
      })
  }


  private convertMapToFormData(formDataMap: Map<string, any>) {
    let formData: FormData = new FormData();
    formDataMap.forEach((value, key: string) => {
      formData.append(key, value);
    });
    return formData;
  }


}
