import Web3 from "web3";
import ABI from "./ABI.json";

class Web3Service {
    web3 = new Web3("http://127.0.0.1:8545");

    contract = new this.web3.eth.Contract(ABI, "0xE4c5BA733A304CA572A44Bfe72420882811a6550");

    async login(login, password) {
        try {
            return await this.contract.methods.signIn(login, password).call();
        } catch (e) {
            console.log(e);
        }
    }

    async register(login, password, address) {
        try {
            return await this.contract.methods.signUp(login, password).send({ from: address });
        } catch (e) {
            console.log(e);
        }
    }

    async getBalances(address) {
        try {
            return await this.contract.methods.getBalances(address).call();
        } catch (e) {
            console.log(e)
        }
    }

    async getUserInfo(address) {
        try {
            return await this.contract.methods.getUserInfo(address).call();
        } catch (e) {
            console.log(e);
        }
    }
}

export default new Web3Service();