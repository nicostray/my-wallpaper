import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseServiceService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      const db = await this.sqlite.create({
        name: 'datos.db',
        location: 'default',
      });
      this.dbInstance = db;
      await db.executeSql(
        `CREATE TABLE IF NOT EXISTS users(
          id INTEGER PRIMARY KEY,
          username TEXT UNIQUE,
          name TEXT,
          lastname TEXT,
          password TEXT
        )`,
        []
      );
      console.log('Table created');
    } catch (error) {
      console.error('DB initialization error', error);
    }
  }

  async executeSQL(sql: string, params: any[] = []): Promise<any> {
    try {
      if (!this.dbInstance) {
        await this.initializeDatabase();
      }
      const data = await this.dbInstance?.executeSql(sql, params);
      console.log('Query executed');
      console.log(data)
      return data;
    } catch (error) {
      console.error('Query execution error', error);
      throw error;
    }
  }

  async getUsers(): Promise<any[]> {
    const sql = `SELECT * FROM users`;
    try {
      const data = await this.executeSQL(sql);
      const users = [];
      for (let i = 0; i < data.rows.length; i++) {
        users.push(data.rows.item(i));
      }
      return users;
    } catch (error) {
      console.error('Error fetching users', error);
      return [];
    }
  }

  async getUser(username: string, password: string): Promise<any> {
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    try {
      const data = await this.executeSQL(sql, [username, password]);
      // const user = data.rows.length > 0 ? JSON.stringify(data.rows.item(0)) : null
      const user = data.rows.length > 0 ? data.rows.item(0) : null
      return user;
    } catch (error) {
      console.error('Error fetching user', error);
      return null;
    }
  }
}
