interface RepositoryFactoryInterface {
    getRepository(classname: string): Repository|false;
}