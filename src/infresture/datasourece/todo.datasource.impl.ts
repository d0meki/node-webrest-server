import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";
import { prisma } from "../../data/postgres";

export class TodoDataSourceImpl implements TodoDatasource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({ data: createTodoDto });
        return TodoEntity.fromObject(todo);
    }
    async getAll(): Promise<TodoEntity[]> {
        // throw new Error("Method not implemented.");
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObject(todo));
    }
    async getById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            throw new Error('Todo not found');
        }
        return TodoEntity.fromObject(todo);
    }
    async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        // throw new Error("Method not implemented.");
        const todo = await prisma.todo.findUnique({ where: { id: updateTodoDto.id } });
        if (!todo) {
            throw new Error('Todo not found');
        }
        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto.values
        });
        return TodoEntity.fromObject(updatedTodo);
    }
    async delete(id: number): Promise<TodoEntity> {
        // throw new Error("Method not implemented.");
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            throw new Error('Todo not found');
        }
        const deletedTodo = await prisma.todo.delete({ where: { id } });
        return TodoEntity.fromObject(deletedTodo);
    }
}