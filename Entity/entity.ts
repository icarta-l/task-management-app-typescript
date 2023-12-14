import type { Request } from 'express';

interface Entity {
    get id(): number;
    set id(id: number);
    hydrateFromRequest(entity: Entity, request: Request): Entity;
}

export type { Entity };