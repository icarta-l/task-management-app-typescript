interface Repository {
    getAll(): Array<Entity>;
    get(id: number): Entity;
    update(entity: Entity): boolean;
    delete(entity: Entity): boolean;
    create(entity: Entity): Entity;
}