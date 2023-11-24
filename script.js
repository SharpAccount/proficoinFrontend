for (i = 0; i < 8; i++) {
    personal.unlockAccount(eth.accounts[i], "123", 0);
}
miner.setEtherbase(eth.accounts[0]);
miner.start();