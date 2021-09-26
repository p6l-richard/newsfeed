import path from 'path'
import {Database} from 'sqlite3'

class AsyncDatabase {
  db: Database;

  constructor(filename: string) {
    this.db = new Database(filename)
  }

  async getOne<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
    const rows = await this.getAll(sql, params);
    return rows[0];
  }

  async getAll<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      console.debug("Executing the following query:", sql);
      const stmt = this.db.prepare(sql);
      stmt.all(...params, (err: Error | undefined, rows: any[]) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

export default new AsyncDatabase(path.join(process.cwd(), 'db.sqlite'))

export type UserRow = {
  id: number;
  name: string;
  bio: string;
  avatar_url: string;
  fellowship: Exclude<FellowshipUnion, "all">;
  created_ts: Date;
  updated_ts: Date;
}

export type ProjectRow = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_ts: Date;
  updated_ts: Date;
}

export type UserProjectRow = {
  user_id: number;
  project_id: number;
}

export type AnnouncementRow = {
  id: number;
  fellowship: FellowshipUnion;
  title: string;
  body: string;
  created_ts: Date;
  updated_ts: Date;
const fellowship = {
  founders: "founders",
  angels: "angels",
  writers: "writers",
  all: "all",
} as const;

export type FellowshipEnum = typeof fellowship;

export type FellowshipUnion = FellowshipEnum[keyof FellowshipEnum];
