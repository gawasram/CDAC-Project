/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        const orgName = process.argv[2];
        const adminName = process.argv[3];
        const adminPassword = process.argv[4];

        const ccpPath = path.resolve(__dirname, '..', 'config', `connection-${orgName}.json`);
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const caInfo = ccp.certificateAuthorities[`${orgName}CA`];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        const walletPath = path.join(process.cwd(), 'wallet', orgName);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get(adminName);
        if (identity) {
            console.log(`An identity for the admin user "${adminName}" already exists in the wallet`);
            return;
        }

        const enrollment = await ca.enroll({ enrollmentID: adminName, enrollmentSecret: adminPassword });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: `${orgName.charAt(0).toUpperCase() + orgName.slice(1)}MSP`,
            type: 'X.509',
        };

        await wallet.put(adminName, x509Identity);
        console.log(`Successfully enrolled admin user "${adminName}" and imported it into the wallet`);

    } catch (error) {
        console.error(`Failed to enroll admin user "${adminName}": ${error}`);
        process.exit(1);
    }
}
