// services/routeros/index.js

import * as system from "./system.js";
import * as interfaces from "./interfaces.js";
import * as addresses from "./addresses.js";
import * as dhcp from "./dhcp.js";
import * as hotspot from "./hotspot.js";
import * as firewall from "./firewall.js";
import * as walledGarden from "./walledGarden.js";

export default {
    system,
    interfaces,
    addresses,
    dhcp,
    hotspot,
    firewall,
    walledGarden
};