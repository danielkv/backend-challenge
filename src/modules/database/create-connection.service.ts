import { Connection, createConnection, getConnection } from 'typeorm';

class ConnectionSetup {
    public connection: Connection = null;

    async create() {
        if (!this.connection) this.connection = await createConnection();

        return this.connection;
    }

    async close() {
        if (!this.connection) return;

        await this.connection.close();
        this.connection = null;

        return true;
    }
}

export const connectionUtils = new ConnectionSetup();
