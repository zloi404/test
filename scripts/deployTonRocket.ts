import { toNano } from 'ton-core';
import { TonRocket } from '../wrappers/TonRocket';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const tonRocket = provider.open(await TonRocket.fromInit());

    await tonRocket.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tonRocket.address);

    // run methods on `tonRocket`
}
