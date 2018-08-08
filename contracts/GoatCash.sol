pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract GoatCash is StandardToken {
	string public name = "GoatCash";
	string public symbol = "GOAT";
	uint public decimals = 18;
	uint public INITIAL_SUPPLY = 450000000 * (10 ** decimals);

	constructor() public {
		totalSupply_ = INITIAL_SUPPLY;
		balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
	}
}
