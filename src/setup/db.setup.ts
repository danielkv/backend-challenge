import { connectionUtils } from '../modules/database/create-connection.service';

export async function setupDB() {
    // connection
    await connectionUtils.create();
}
