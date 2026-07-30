import { connect } from "./connection.js";

export async function getLeases() {

    const conn = await connect();

    try {

        const leases = await conn.write("/ip/dhcp-server/lease/print");

        return leases.map(lease => ({
            id: lease[".id"],
            ipAddress: lease.address,
            macAddress: lease["mac-address"],
            hostName: lease["host-name"],
            status: lease.status,
            dynamic: lease.dynamic
        }));

    } finally {

        conn.close();

    }

}