export class Menu {
  name: string;
  actions: Action[];
}
export class Action {
  code:string;
  httpType:string;
  definition:string;
  actionType:string;
}
