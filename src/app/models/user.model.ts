export class User {
  street:string;
  name:string;
  email:string;
  room:number;
  osbb_id:number;
  password:string;
  role:number;
  approved?:boolean
  [propName: string]: any;
}
