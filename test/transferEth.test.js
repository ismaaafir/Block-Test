const SimpleContract = artifacts.require("SimpleContract");

contract("SimpleContract", (accounts) => {
  const sender = accounts[5];
  const receiver = accounts[6];

  it("should transfer ETH from sender to receiver and log details", async () => {
    const initialBalanceSender = BigInt(await web3.eth.getBalance(sender));
    const initialBalanceReceiver = BigInt(await web3.eth.getBalance(receiver));

    // Transaction details
    const transferAmount = web3.utils.toWei("10", "ether");
    const gasPrice = BigInt(await web3.eth.getGasPrice());
    const startTime = Date.now();

    const tx = await web3.eth.sendTransaction({
      from: sender,
      to: receiver,
      value: transferAmount,
      gasPrice: gasPrice.toString(),
    });

    const endTime = Date.now();
    const timeConsumed = endTime - startTime;

    const finalBalanceSender = BigInt(await web3.eth.getBalance(sender));
    const finalBalanceReceiver = BigInt(await web3.eth.getBalance(receiver));

    const gasUsed = BigInt(tx.gasUsed);
    const gasCost = gasPrice * gasUsed;

    // Debugging: Log all values to verify calculations
    console.log("Initial Sender Balance:", initialBalanceSender.toString());
    console.log("Initial Receiver Balance:", initialBalanceReceiver.toString());
    console.log("Final Sender Balance:", finalBalanceSender.toString());
    console.log("Final Receiver Balance:", finalBalanceReceiver.toString());
    console.log("Gas Used:", gasUsed.toString());
    console.log("Gas Price (Wei):", gasPrice.toString());
    console.log("Gas Cost (Wei):", gasCost.toString());
    console.log("Transfer Amount (Wei):", transferAmount);

    console.log("Transaction Details:");
    console.log("Sender:", sender);
    console.log("Receiver:", receiver);
    console.log("Time Consumed (ms):", timeConsumed);

    // Assertions
    assert.equal(
      finalBalanceReceiver,
      initialBalanceReceiver + BigInt(transferAmount),
      "Receiver's balance should increase by the transfer amount"
    );

    assert.equal(
      finalBalanceSender,
      initialBalanceSender - BigInt(transferAmount) - gasCost,
      "Sender's balance should decrease by transfer amount and gas cost"
    );
  });
});
