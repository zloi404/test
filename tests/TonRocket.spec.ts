import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { TonRocket } from '../wrappers/TonRocket';
import '@ton-community/test-utils';

describe('TonRocket', () => {
    let blockchain: Blockchain;
    let tonRocket: SandboxContract<TonRocket>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tonRocket = blockchain.openContract(await TonRocket.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await tonRocket.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonRocket.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tonRocket are ready to use
    });
});
