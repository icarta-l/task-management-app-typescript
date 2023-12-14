import type { Entity } from "../Entity/entity.js";

interface Repository {
    getAll(): Promise<Entity[]>;
    get(id: number): Entity;
    update(entity: Entity): boolean;
    delete(entity: Entity): boolean;
    create(entity: Entity): Promise<Entity>;
    close(): Promise<void>;
    connect(host: string, user: string, password: string, port: number, database_name: string): Promise<void>
}

export type { Repository };