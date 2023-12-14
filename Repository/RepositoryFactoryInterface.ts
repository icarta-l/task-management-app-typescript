import type { Repository } from "./Repository.js";

interface RepositoryFactoryInterface {
    getRepository(classname: string): Promise<Repository|false>;
}

export type { RepositoryFactoryInterface };