import type { Request, Response } from 'express';

interface Controller {
    processAction(request: Request, response: Response): Promise<void>;
}

export type { Controller };