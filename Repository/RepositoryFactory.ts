import "dotenv/config";

const UserRepository = require("./UserRepository.js");

module.exports = class RepositoryFactory implements RepositoryFactoryInterface {
    public async getRepository(classname: string): Promise<Repository|false>
    {
        switch(classname) {
            case "User":
                const userRepository = new UserRepository();
                await userRepository.connect(process.env.POSTGRESQL_HOST, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, Number(process.env.POSTGRESQL_PORT), process.env.POSTGRESQL_DATABASE);
                return userRepository;
                break;

            default:
                return false;
        }
    }
}