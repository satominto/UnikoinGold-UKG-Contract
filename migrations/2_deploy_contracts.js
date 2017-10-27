var ParticipantAdditionProxy = artifacts.require("./ParticipantAdditionProxy.sol");
var TokenDistribution = artifacts.require("./TokenDistribution.sol");
var UnikoinGold = artifacts.require("./UnikoinGold.sol");

now = web3.eth.getBlock(web3.eth.blockNumber).timestamp;

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const PROXY_ADDRESS = '0x52f04d73346fD754758d877c3eaa040c828E31D8';
const UKG_FUND =  web3.eth.coinbase;

const FREEZE_TIMESTAMP = now + (1 * DAY);
const DISTRIBUTION_START_TIMESTAMP = now + (2 * DAY);

module.exports = function(deployer, network) {

    if (network == 'mainproxy') {
        deployer.deploy(ParticipantAdditionProxy);
    }

    if (network == 'maindistribution') {
        deployer.deploy(TokenDistribution, PROXY_ADDRESS, FREEZE_TIMESTAMP, DISTRIBUTION_START_TIMESTAMP).then(function() {
            return deployer.deploy(UnikoinGold, TokenDistribution.address, UKG_FUND);
        });
    }
};
