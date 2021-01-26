import { Connection, createConnection, getConnection } from 'typeorm';

class ConnectionSetup {
    public connection: Connection = null;

    async create() {
        if (!this.connection) this.connection = await createConnection();

        return this.connection;
    }

    async close() {
        if (this.connection) return;

        await getConnection().close();
        this.connection = null;
    }
}

export const connectionUtils = new ConnectionSetup();
