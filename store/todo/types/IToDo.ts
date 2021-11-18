export interface IToDo {
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IToDoEssencial = Pick<IToDo, "title" | "description">;
