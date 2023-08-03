const db = require("../config/db");

class User{
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }
    
    async save() {
        let userQuery = `INSERT INTO user (user_id, user_email, user_name) VALUES ('${this.id}', '${this.email}', '${this.name}')`;
        
        let authQuery = `INSERT INTO auth (user_id, user_password, user_role) VALUES ('${this.id}', '${this.password}', '${this.role}')`;
        
        // We need to save the user first because the auth table has a foreign key constraint
        let userSave = await db.execute(userQuery);
        let authSave = await db.execute(authQuery);
        return {userSave, authSave};
    }
    
    static async findByEmail(email) {
        let query = `SELECT user.*, auth.* FROM user INNER JOIN auth ON user.user_id = auth.user_id WHERE user.user_email = '${email}'`;
        let result = await db.execute(query);
        console.log(result);
        if(result.length == 0) 
            return null;
        return result[0][0];
    }
     
    static async findByID(id) {
        let query = `SELECT user.*, auth.user_role FROM user INNER JOIN auth ON user.user_id = auth.user_id WHERE user.user_id = '${id}';`;
        let result = await db.execute(query);
        return result[0];
    }
}

module.exports = User;