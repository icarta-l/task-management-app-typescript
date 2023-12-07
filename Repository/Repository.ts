interface Repository {
    getAll(): Promise<Entity[]>;
    get(id: number): Entity;
    update(entity: Entity): boolean;
    delete(entity: Entity): boolean;
    create(entity: Entity): Promise<Entity>;
    close(): Promise<void>;
}

export type {Repository};