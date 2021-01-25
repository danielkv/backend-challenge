import csv from 'csv-parser';
import fs from 'fs';

export function csvImporter(file: string) {
    return new Promise<any>((resolve, reject) => {
        const rows: any[] = [];

        fs.createReadStream(file)
            .pipe(csv())
            .on('data', (row) => {
                row.price = Number(row.price);
                row.quantity = Number(row.quantity);
                rows.push(row);
            })
            .on('end', () => {
                resolve(rows);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}
