import RouterOS from "./services/routeros/index.js";


async function main() {

    try {

        console.log(await RouterOS.system.getIdentity());

        console.log(await RouterOS.system.getResources());

        console.log(await RouterOS.system.getClock());

        console.log(await RouterOS.system.getRouterBoard());

        console.table( await RouterOS.interfaces.getAll());

        console.log(await RouterOS.addresses.address());

        console.log(await RouterOS.dhcp.getLeases());

        console.log("--------------------------------------------")

        console.log(await RouterOS.hotspot.getHosts())

        console.log("--------------------------------------------")

        console.log(await RouterOS.hotspot.getActiveUsers())

       /* await RouterOS.hotspot.login({

            ipAddress: "192.168.88.252",

            macAddress: "2A:A7:F6:5B:87:5D",

            username: "admin",

            password: "coffee"

        });

        console.log("Login command sent.");*/


        

    } catch (err) {

        console.error(err);

    } finally {

        console.log("THAT WAS ALL OF IT")

    }

}

main();