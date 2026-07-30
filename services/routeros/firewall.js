import { connect } from "./connection.js";

export async function getFilterRules() {

    const conn = await connect();

    try {

        return await conn.write("/ip/firewall/filter/print");

    } finally {

        conn.close();

    }

}

export async function getNatRules() {

    const conn = await connect();

    try {

        return await conn.write("/ip/firewall/nat/print");

    } finally {

        conn.close();

    }

}