import { connect } from "./connection.js";

export async function address() {

    const conn = await connect();

    try {

        const addresses = await conn.write("/ip/address/print");

        return addresses[0];

    } finally {

        conn.close();

    }

}