import { connect } from "./connection.js";

export async function getHosts() {

    const conn = await connect();

    try {

        const hosts = await conn.write("/ip/hotspot/host/print");

        return hosts.map(host => ({
            id: host[".id"],
            ipAddress: host.address,
            macAddress: host["mac-address"],
            authorized: host.authorized,
            bypassed: host.bypassed,
            server: host.server
        }));

    } finally {

        conn.close();

    }

}

export async function getActiveUsers() {

    const conn = await connect();

    try {

        const active = await conn.write("/ip/hotspot/active/print");

        return active.map(user => ({
            id: user[".id"],
            user: user.user,
            ipAddress: user.address,
            macAddress: user["mac-address"],
            uptime: user.uptime,
            server: user.server
        }));

    } finally {

        conn.close();

    }

}

export async function login({ ipAddress, macAddress, username, password }) {

    const conn = await connect();

    try {

        return await conn.write("/ip/hotspot/active/login", [
            `=ip=${ipAddress}`,
            `=mac-address=${macAddress}`,
            `=user=${username}`,
            `=password=${password}`
        ]);

    } finally {

        conn.close();

    }

}

export async function logout(sessionId) {

    const conn = await connect();

    try {

        return await conn.write("/ip/hotspot/active/remove", [
            `=.id=${sessionId}`
        ]);

    } finally {

        conn.close();

    }

}