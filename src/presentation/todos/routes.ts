import { Router } from "express";
import { TodoController } from "./controller";
import { TodoDataSourceImpl } from "../../infresture/datasourece/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infresture/repositories/todo.repository.impl";


export class TodoRoutes {
    static get routes() {
        const router = Router();

        const datasource = new TodoDataSourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource);
        const todoController = new TodoController(todoRepository);
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);
        return router;
    }
}