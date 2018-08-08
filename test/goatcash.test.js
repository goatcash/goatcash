const GoatCash = artifacts.require("./GoatCash.sol");
const EVMRevert = 'revert';
const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('GoatCash', function(accounts) {
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
  const owner = accounts[0];
  const anotherAccount = accounts[1];
  const totalSupplyExpected = 450000000 * (10 ** 18);

  beforeEach(async function () {
    this.token = await GoatCash.new({ from: owner });
  });

  describe('total supply', function () {
    it('returns the total amount of tokens ' + totalSupplyExpected, async function () {
      const totalSupply = await this.token.totalSupply();
      totalSupply.should.be.bignumber.equal(totalSupplyExpected);
    });
  });

  describe('balanceOf', function () {
    describe('when the requested account has no tokens', function () {
      it('returns zero', async function () {
        const balance = await this.token.balanceOf(anotherAccount);
		    balance.should.be.bignumber.equal(0);
      });
    });

    describe('when the requested account has some tokens', function () {
      it('returns the total amount of tokens', async function () {
        const balance = await this.token.balanceOf(owner);
        balance.should.be.bignumber.equal(totalSupplyExpected);
      });
    });
  });

  describe('transfer', function () {
    describe('when the recipient is not the zero address', function () {
      const to = anotherAccount;

      describe('when the sender does not have enough balance', function () {
        const amount = totalSupplyExpected * 2;
        it('reverts', async function () {
          await this.token.transfer(to, amount, { from: owner }).should.be.rejectedWith(EVMRevert);
        });
      });

      describe('when the sender has enough balance', function () {
        const amount = totalSupplyExpected;

        it('transfers the requested amount', async function () {
          await this.token.transfer(to, amount, { from: owner });

          const senderBalance = await this.token.balanceOf(owner);
          senderBalance.should.be.bignumber.equal(0);

          const recipientBalance = await this.token.balanceOf(to);
          recipientBalance.should.be.bignumber.equal(amount);
        });

        it('emits a transfer event', async function () {
          const { logs } = await this.token.transfer(to, amount, { from: owner });

          const event = logs.find(e => e.event === 'Transfer');
          should.exist(event);
          event.args.from.should.equal(owner);
          event.args.to.should.equal(to);
          event.args.value.should.be.bignumber.equal(amount);
        });
      });
    });

    describe('when the recipient is the zero address', function () {
      const to = ZERO_ADDRESS;

      it('reverts', async function () {
        await this.token.transfer(to, totalSupplyExpected, { from: owner }).should.be.rejectedWith(EVMRevert);
      });
    });
  });
});
