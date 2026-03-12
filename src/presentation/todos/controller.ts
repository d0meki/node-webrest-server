import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodoController {
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id is not a number' })
        }
        const todo = await prisma.todo.findUnique({ where: { id: Number(id) } })
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
        }
        res.json(todo)

    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) {
            return res.status(400).json({ error })
        }
        const todo = await prisma.todo.create({
            data: createTodoDto!
        })
        res.json(todo)

    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
        if (error) {
            return res.status(400).json({ error })
        }
        const todo = await prisma.todo.findUnique({ where: { id: Number(id) } })
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
        }
        const updatedTodo = await prisma.todo.update({
            where: { id: Number(id) },
            data: updateTodoDto!.values
        })

        res.json(updatedTodo)

    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id is not a number' })
        }
        const todo = await prisma.todo.findUnique({ where: { id: Number(id) } })
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' })
        }
        const deletedTodo = await prisma.todo.delete({ where: { id: Number(id) } })
        res.json(deletedTodo)

    }

}