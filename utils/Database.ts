import * as SQLite from 'expo-sqlite';

const database_name = 'nutriapp.db';

export async function initializeDatabase() {
  const db = await SQLite.openDatabaseAsync(database_name);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      usuario TEXT NOT NULL, 
      senha TEXT
    );
    CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      plano TEXT NOT NULL,
      data_inicial TEXT NOT NULL, 
    ); 
  `)
}
 