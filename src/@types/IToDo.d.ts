declare interface IToDo {
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

declare type IToDoEssencial = Pick<IToDo, "title" | "description">;
