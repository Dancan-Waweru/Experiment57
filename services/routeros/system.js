import { connect } from "./connection.js";

/**
 * Get router identity
 */
export async function getIdentity() {

    const conn = await connect();

    try {
        const result = await conn.write("/system/identity/print");
        return result[0];

    } finally {
        conn.close();
    }

}


/**
 * Get router resources
 * CPU, RAM, uptime, version...
 */
export async function getResources() {

    const conn = await connect();

    try {
        const result = await conn.write("/system/resource/print");
        return result[0];

    } finally {
        conn.close();
    }

}


/**
 * Get router clock
 */
export async function getClock() {

    const conn = await connect();

    try {
        const result = await conn.write("/system/clock/print");
        return result[0];

    } finally {
        conn.close();
    }

}


/**
 * Get router board information
 */
export async function getRouterBoard() {

    const conn = await connect();

    try {
        const result = await conn.write("/system/routerboard/print");
        return result[0];

    } finally {
        conn.close();
    }

}