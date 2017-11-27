export class Task {
  constructor (username: string,email: string,text: string,image_path: string,id?:number,status?:number){
    this.username = username;
    this.email = email;
    this.text = text;
    this.image_path = image_path;
    this.id = id;
    this.status = status;
  }
  public id:number;
  public username: string;
  public email: string;
  public text: string;
  public image_path: string;
  public status:number;
}
