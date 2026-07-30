import { connect } from "./connection.js";

export async function getAll() {

    const conn = await connect();

    try {

        const interfaces = await conn.write("/interface/print");

        return interfaces.map(iface => ({
            id: iface[".id"],
            name: iface.name,
            type: iface.type,
            running: iface.running,
            disabled: iface.disabled,
            macAddress: iface["mac-address"]
        }));

    } finally {

        conn.close();

    }

}