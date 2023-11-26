import Web3 from "web3";
import ABI from "./ABI.json";

class Web3Service {
    web3 = new Web3("http://127.0.0.1:8545");

    contract = new this.web3.eth.Contract(ABI, "0x83C5b55Ebc0CF5C24FE4De388Dd97Bdce472af4F");

    async login(login, password) {
        try {
            return await this.contract.methods.signIn(login, password).call();
        } catch (e) {
            alert(e);
        }
    }

    async register(login, password, address) {
        try {
            return await this.contract.methods.signUp(login, password).send({ from: address });
        } catch (e) {
            alert(e);
        }
    }

    async getBalances(address) {
        try {
            return await this.contract.methods.getBalances(address).call();
        } catch (e) {
            console.log(e)
        }
    }

    async getTime() {
        try {
            return await this.contract.methods.getTime().call();
        } catch (e) {
            console.log(e)
        }
    }

    async updatePhase() {
        try {
            return await this.contract.methods.checkTime().call();
        } catch (e) {
            console.log(e);
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