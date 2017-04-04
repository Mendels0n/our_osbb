export class User {
  street:string;
  name:string;
  email:string;
  room:number;
  ossb_Id:number;
  password:string;
  role:number;
  approved?:boolean
  [propName: string]: any;
}
