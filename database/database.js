import express from 'express';
import sqlite from 'sqlite3';
import wizards from '../wizards/wizards';

export function dbGetAll(sql, params =[]){
    return new Promise((reoslve, reject) =>{
        db.get(sql, params, (err, row) =>{
            if (err) reject (err);
            else resove(row);
        });
    });
}
export function dbGetById(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

export function dbPut(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {  
            if (err) reject(err);
            else resolve(this.changes);  
        });
    });
}

export function dbPost(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {  
            if (err) reject(err);
            else resolve(this.lastID);  
        });
    });
}

export function dbDeleteById(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {  
            if (err) reject(err);
            else resolve(this.changes); 
        });
    });
}


export async function initializeDatabase(){
    await dbRun("DROP TABLE IF EXISTS roxfort");
    await dbRun("CREATE TABLE IF NOT EXISTS roxfort (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, age INTEGER, staff STRING, house STRING)");

    const importedWizards = wizards;

    for(const wizard of importedWizards){
        await dbRun("INSERT INTO roxfort (name, age, staff, house) VALUES (?,?,?,?);",[wizard.name,wizard.age,wizard.staff,wizard.house]);
    }

}