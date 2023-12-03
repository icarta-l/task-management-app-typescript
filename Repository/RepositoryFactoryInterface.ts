interface RepositoryFactoryInterface {
    getRepository(classname: string): Promise<Repository|false>;
}