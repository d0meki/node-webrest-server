import { Request, Response } from "express";

export class TodoController {
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        return res.json('Get Todos');
    }

    public getTodoById = (req: Request, res: Response) => {
        // return res.json('Get Todos');
        const id = req.params.id;

        res.json({ id })

    }

    public createTodo = (req: Request, res: Response) => {
        // return res.json('Get Todos');

        res.json(req.body)

    }

    public updateTodo = (req: Request, res: Response) => {
        // return res.json('Get Todos');
        const { hola } = req.body
        const id = req.params.id;
        console.log(hola);

        const respuesta = {
            text: 'update TOdo: ' + id + hola,
            cuerpo: hola
        }
        res.json(respuesta)

    }

    public deleteTodo = (req: Request, res: Response) => {
        // return res.json('Get Todos');
        const id = req.params.id;
        res.json(`Delete Todo: ${id}`)

    }

}