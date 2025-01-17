import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

class Database {
   private static _database: Database;
   private constructor() {
      // Skip database connection if we're running tests
      if (process.env.NODE_ENV === 'test') {
         return;
      }

      const dbUrl = process.env.MONGO_URL;
      if (dbUrl) {
         mongoose.connect(dbUrl)
            .then(() => console.info('Connected with database'))
            .catch(() => console.info('Not connected with database'));
      }
   }

   static getInstance() {
      if (this._database) {
         return this._database;
      }
      this._database = new Database();
      return this._database;
   }
}

export default Database;