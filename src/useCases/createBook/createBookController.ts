import { Request, Response, response } from "express";
import { Book } from '../../models/Book';
import { CreateBookUseCase } from "./CreateBookUseCase";

export class CreateBookController {
    private createBookCase : CreateBookUseCase

    constructor( bookCase : CreateBookUseCase)
    {
        this.createBookCase = bookCase
    }

    async handle(request : Request, response : Response) : Promise<Response>
    {
        console.log('Chegou no Controller')
        const {name, autor} = request.body
        let file = null

        if(request.file)
        {
            const reqName = request.body.name.toString().replace(' ', '-').replace('.', '_')
            file = request.file.fieldname + "-" + reqName + "-" + request.file.originalname
        }

        try {
            const result = await this.createBookCase.execute({
                name, 
                autor,
                file
            })

            return response.status(result.status).json(result.body)
        } catch (error : any) {
            return response
            .status(400)
            .json({message : error.message || 'Unexpected Error.'})
        }
    }
}