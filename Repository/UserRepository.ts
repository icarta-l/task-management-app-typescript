const User = require("../Entity/user.js");
const PostgreSQLDatabase = require("../Database/PostgreSQLDatabase.js");

module.exports = class UserRepository implements Repository {
    private databaseConnection: DatabaseInterface;

    constructor()
    {
        this.databaseConnection = PostgreSQLDatabase.getInstance();
    }

    public async getAll(): Promise<Entity[]>
    {
        return await this.databaseConnection.query("SELECT * FROM app_users");
    }
    get(id: number): Entity;
    update(entity: Entity): boolean;
    delete(entity: Entity): boolean;

    private hydrateRow(result: object): UserInterface
    {
        const userData = result.rows[0];
        const user = new User();
        user.username = userData.username;
        user.password = userData.password;
        user.firstName = userData.first_name;
        user.lastName = userData.last_name;
        user.email = userData.email;
        user.id = userData.id;

        return user;
    }

    public async create(user: Entity): Promise<Entity>
    {
        const result = await this.databaseConnection.query(
            "INSERT INTO app_users (first_name, last_name, password, username, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [user.firstName, user.lastName, user.password, user.username, user.email]
            );
        return this.hydrateRow(result);
    }
}