import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {
  TodoListImage,
  TodoListImageWithRelations,
} from './todo-list-image.model';
import {Todo, TodoWithRelations} from './todo.model';

@model()
export class TodoList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  color?: string;

  // testing json type
  @property({
    type: 'object',
    required: false,
    postgresql: {
      columnName: 'additional_info',
      dataType: 'text',
    },
  })
  additionalInfo?: object;

  @hasMany(() => Todo)
  todos: Todo[];

  @hasOne(() => TodoListImage)
  image: TodoListImage;

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  // describe navigational properties here
  todos?: TodoWithRelations[];

  image?: TodoListImageWithRelations;
}

export type TodoListWithRelations = TodoList & TodoListRelations;
