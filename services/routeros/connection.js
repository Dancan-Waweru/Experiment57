// services/routeros/connection.js

import { RouterOSAPI } from "node-routeros";
import config from "../../config/router.js";

export async function connect() {

    const conn = new RouterOSAPI({

        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port

    });

    await conn.connect();

    return conn;

}