cd geth 
if not exist genesis.json (geth --datadir "" init genesis.json)
geth --datadir "" --http --http.api="web3,net,admin,eth,txpool,miner,personal,debug" --http.corsdomain * --port 3030 --networkid 8545 --preload script.js  --allow-insecure-unlock console
