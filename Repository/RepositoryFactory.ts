module.exports = class RepositoryFactory implements RepositoryFactoryInterface {
    public getRepository(classname: string): Repository|false
    {
        switch(classname) {
            case "User":
                return new UserRepository();
                break;

            default:
                return false;
        }
    }
}