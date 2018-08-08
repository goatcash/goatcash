pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/GoatCash.sol";

contract TestGoatCash {
    GoatCash coin;

    function testInitialBalanceUsingDeployedContract() public {
        coin = GoatCash(DeployedAddresses.GoatCash());

        uint expected = 450000000 * (10 ** 18);

        Assert.equal(coin.balanceOf(msg.sender), expected, "Sender should have 450,000,000 tokens initially");
    }
}
