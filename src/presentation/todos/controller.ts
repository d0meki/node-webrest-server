import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodoController {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        // const todos = await prisma.todo.findMany();
        // return res.json(todos);
        const todos = await this.todoRepository.getAll();
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        /* const id = req.params.id;
        if (isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id is not a number' })
        }
        const todo = await prisma.todo.findUnique({ where: { id: Number(id) } })
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
        }
        res.json(todo) */
        const id = req.params.id;
        try {
            const todo = await this.todoRepository.getById(Number(id));
            return res.json(todo);
        } catch (error) {
            return res.status(404).json({ error: 'Todo not found' })
        }

    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) {
            return res.status(400).json({ error })
        }
        /*  const todo = await prisma.todo.create({
             data: createTodoDto!
         })
         res.json(todo) */
        const todo = await this.todoRepository.create(createTodoDto!);
        return res.json(todo);

    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
        if (error) {
            return res.status(400).json({ error })
        }
        /* const todo = await prisma.todo.findUnique({ where: { id: Number(id) } })
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
        }
        const updatedTodo = await prisma.todo.update({
            where: { id: Number(id) },
            data: updateTodoDto!.values
        })

        res.json(updatedTodo) */
        const todo = await this.todoRepository.update(updateTodoDto!);
        return res.json(todo);

    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = req.params.id;
        /* if (isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id is not a number' })
        }
        const todo = await prisma.todo.findUnique({ where: { id: Number(id) } })
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
        }
        const deletedTodo = await prisma.todo.delete({ where: { id: Number(id) } })
        res.json(deletedTodo) */
        try {
            const todo = await this.todoRepository.delete(Number(id));
            return res.json(todo);
        } catch (error) {
            return res.status(404).json({ error: 'Todo not found' })
        }
    }

}