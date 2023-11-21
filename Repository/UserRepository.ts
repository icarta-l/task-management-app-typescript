const User = require("../Entity/user.js");

module.exports = class UserRepository implements Repository {
    private databaseConnection: DatabaseInterface;

    public async getAll(): Array<Entity>
    {
        const result = await this.databaseConnection.query("SELECT * FROM app_users");
    }
    get(id: number): Entity;
    update(entity: Entity): boolean;
    delete(entity: Entity): boolean;

    private hydrateRow(userData: array): Entity
    {
        console.log(userData);
    }

    public async create(entity: Entity): Entity
    {
        const result = await this.databaseConnection.query("INSERT INTO app_users (first_name, last_name, password, username, email) VALUES ($1, $2, $3, $4, $5) RETURNING *");
        return this.hydrateRow(result);
    }
}