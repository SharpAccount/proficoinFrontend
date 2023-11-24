// SPDX-License-Identifier: MIT
pragma solidity <=0.8.20;

import "ERC20.sol";

contract PROFI is ERC20("ProfiCoin", "PROFI") {
    enum Roles {
        User,
        PrivateProvider,
        PublicProvider,
        Owner
    }

    enum Phases {
        Seed,
        Private,
        Public 
    }

    struct User {
        string login;
        address addr;
        uint seedBalance;
        uint privateBalance;
        uint publicBalance;
        Roles role;
        bool isInWhitelist;
    }

    struct WhiteList {
        string login;
        address networkAddress;
        bool isApproved;
    }

     address owner;

    mapping(string => address) logsAddresses;
    mapping(string => bytes32) logsPasses;
    mapping(address => User) registeredUsers;

    uint token = 10 ** decimals();
    uint tokenPrice;
    uint maxAmount;

    uint Time_dif = 0;
    uint Time_start = block.timestamp;

    Phases currentPhase = Phases.Seed;

    WhiteList[] requests;
    WhiteList[] approves;

    // принимает на вход требуюмую фазу, а после проверяет, совпадает текущая фаза с введеной
    modifier onlyThisPhase(Phases phase) {
        require(phase == currentPhase, unicode"Не в эту фазу!");
        _;
    }

    // принимает на вход требуюмую роль, а после проверяет, совпадает роль пользователя с введеной
    modifier onlyThisRole(Roles role) {
        require(role == registeredUsers[msg.sender].role, unicode"Вы не обладаете соотвтетствующими правами!");
        _;
    }

    constructor()  {
        owner = 0x0c1936792479Ca558334Aae08694a69944C82d3A;
        registeredUsers[owner] = User("owner", owner, 150_000 * token, 4_000_000 * token, 5_000_000 * token, Roles.Owner, false);
        logsAddresses["owner"] = owner;
        logsPasses["owner"] = keccak256(abi.encode("123"));
        _mint(owner, 10_000_000 * token);

        address privProv = 0xCd2d2260B689fB51014970F7c4F42C52bbe622bA;
        registeredUsers[privProv] = User("priv prov", privProv, 0, 0, 0, Roles.PrivateProvider, false);
        logsAddresses["priv prov"] = privProv;
        logsPasses["priv prov"] = keccak256(abi.encode("123"));
        

        address pubProv = 0xA91333A2e045a46Ae332685b862F5B5D6b786E64;
        registeredUsers[pubProv] = User("pub prov", pubProv, 0, 0, 0, Roles.PublicProvider, false);
        logsAddresses["pub prov"] = pubProv;
        logsPasses["pub prov"] = keccak256(abi.encode("123"));


        address inv1 = 0xe570B163c39Fd0eA8Db1f3d682570c78a23678b9;
        registeredUsers[inv1] = User("Yanis", inv1, 250_000 * token, 0, 0, Roles.User, false);
        logsAddresses["Yanis"] = inv1;
        logsPasses["Yanis"] = keccak256(abi.encode("123"));

        address inv2 = 0x4FCB78f0667b1658a79E34DD48623CCCc6E715d7;
        registeredUsers[inv2] = User("Ivan", inv2, 225_000 * token, 0, 0, Roles.User, false);
        logsAddresses["Ivan"] = inv2;
        logsPasses["Ivan"] = keccak256(abi.encode("123"));

        address inv3 = 0xaCD26323747A8397A069D8Ad2b4f453EE68Ecf61;
        registeredUsers[inv3] = User("Nikita", inv3, 375_000 * token, 0, 0, Roles.User, false);
        logsAddresses["Nikita"] = inv3;
        logsPasses["Nikita"] = keccak256(abi.encode("123"));

        _transfer(owner, inv1, 250_000 * token);
        _transfer(owner, inv2, 223_000 * token);
        _transfer(owner, inv3, 375_000 * token);
    }

    // в качестве входных параметров принимает логин пользователя и пароль, и, если после проверки логина оказывается,
    // что он не занят, добавляет пользователя в маппинги registeredUsers, logsAddresses, logsPasses и  выводит данные зарегестрированного пользователя 
    function signUp(string memory login, string memory password) public returns(User memory) {
        checkTime();

        require(logsAddresses[login] == address(0), unicode"данный логин уже занят!");

        registeredUsers[msg.sender] = User(login, msg.sender, 0, 0, 0, Roles.User, false);        
        logsAddresses[login] = msg.sender;
        logsPasses[login] = keccak256(abi.encode(password));

        return registeredUsers[msg.sender];
    }

    // не принимает параметров. Прибавляет к времени жизни системы 1 минуту
    function addMinute() public {
        Time_dif += 60;
        checkTime();
    }

    // принимает в качестве параметров логин получателя токенов, количество токенов и их тип (0 - seed, 1 - private, 2 - public)
    // затем вычитает с соответствующего группе токенов баланса отправителя кол-во переводимых токенов, а затем прибавляет их к балансу получателя
    // после переводит сами токены к получателю. Также в методе реализованы функции проверки наличия достаточного количесвта токенов на балансе 
    function tokenTransfer(string memory to, uint amount, uint tokenType) public {
        checkTime();
        require(tokenType < 3, unicode"нет такой группы токенов!");
        
        amount *= token;

        if (tokenType == 0) {
            require(registeredUsers[msg.sender].seedBalance >= amount, unicode"Вам не хватает seed токенов!");
            
            registeredUsers[msg.sender].seedBalance -= amount;
            registeredUsers[logsAddresses[to]].seedBalance += amount;
        } else if (tokenType == 1) {
            require(registeredUsers[msg.sender].privateBalance >= amount, unicode"Вам не хватает private токенов!");
            
            registeredUsers[msg.sender].privateBalance -= amount;
            registeredUsers[logsAddresses[to]].privateBalance += amount;
        } else {
            require(registeredUsers[msg.sender].publicBalance >= amount, unicode"Вам не хватает public токенов!");
            
            registeredUsers[msg.sender].publicBalance -= amount;
            registeredUsers[logsAddresses[to]].publicBalance += amount;
        }

        _transfer(msg.sender, logsAddresses[to], amount);
    }

    // принимает в качестве параметров логин получателя и кол-во переводимых токенов. Проверяет наличие достаточного количества токенов у отправителя
    // а затем запускает метод tokenTransfer
    function giveReward(string memory to, uint amount) public onlyThisRole(Roles.PublicProvider) onlyThisPhase(Phases.Public) {
        checkTime();
        require(registeredUsers[msg.sender].publicBalance >= amount, unicode"У вас недостаточно токенов!");
        tokenTransfer(to, amount, 2);
    }

    // принимает в качестве параметра стоимость токена в wei. После вызова метода checkTime(), присваивает значение токена входимому параметру
    function changeTokenPrice(uint tokenInWei) public onlyThisPhase(Phases.Public) onlyThisRole(Roles.PublicProvider) {
        checkTime();
        tokenPrice = tokenInWei;
    }

    // принимает в качестве параметра количество токенов на покупку и тип покупаемого токена.
    // после проверки введенного типа токена, наличия достаточного количества eth. и перевода соответствующего количества eth. 
    // изменяет значения соответствующих балансов пользователей, а затем переводит сами токены на адрес покупателя 
    // (при переводе private токенов проверяет наличие пользователя в whitelist)
    function buyToken(uint amount, uint tokenType) public payable {
        require(tokenType > 0 && tokenType < 3, unicode"нельзя покупать токены такой группы !");
        require(msg.value >= amount * tokenPrice, unicode"Не хватает eth для покупки этого количества токенов!");

        payable(owner).transfer(msg.value);
        
        amount *= token;
        require(amount <= maxAmount, unicode"Нельзя переводить столько токенов в эту фазу!");

        if (tokenType == 1) {
            require(currentPhase == Phases.Private, unicode"Private фаза прошла/не началась!");
            require(registeredUsers[owner].privateBalance >= amount, unicode"Приносим свои извинениия, не хватает private токенов!");
            require(registeredUsers[msg.sender].isInWhitelist == true, "Free sale not started");
            
            registeredUsers[owner].privateBalance -= amount;
            registeredUsers[msg.sender].privateBalance += amount;
        } else {
            require(currentPhase == Phases.Private, unicode"Public фаза прошла/не началась!");
            require(registeredUsers[owner].publicBalance >= amount, unicode"Приносим свои извинениия, не хватает public токенов!");
            
            registeredUsers[owner].publicBalance -= amount;
            registeredUsers[msg.sender].publicBalance += amount;
        }

        _transfer(owner, msg.sender, amount);
        checkTime();
    }

    // в качестве входных параметров принимает логин пользователя и пароль, и, если после проверки пароля оказывается,
    // что логин и пароль в маппинге logsPasses совпадают, выводит данные "вошедшего в систему" пользователя
    function signIn(string memory login, string memory password) public view returns(User memory) {
        require(keccak256(abi.encode(password)) == logsPasses[login], unicode"Не верный логин или пароль!");
        return registeredUsers[logsAddresses[login]];
    }

    // в качестве входных параметров принимает логин пользователя и адрес в сети etherium. Добавляет введенные пользователем данные
    // в массив запросов в whitelist - requests  
    function sendInviteRequest(string memory login, address networkAddress) public onlyThisPhase(Phases.Seed) returns(WhiteList memory) {
        requests.push(WhiteList(login, networkAddress, false));
        return requests[requests.length-1];
    }

    // в качестве входных параметров принимает номер заявки в whitelist и одобряется ли заявка. Добавляет введенные пользователем данные в заявке
    // в whitelist - approves, также изменяет значение isInWhitelist на true
    function approveRequest(uint requestNum, bool isApproved) public onlyThisPhase(Phases.Seed) onlyThisRole(Roles.PrivateProvider) returns(WhiteList memory) {
        if (isApproved == true) {
            approves.push(requests[requestNum]);
            registeredUsers[requests[requestNum].networkAddress].isInWhitelist = true;
        }
        delete requests[requestNum];

        return approves[approves.length-1];
    }

    //выводит балансы в сети ethereum и profi
    function getBalances(address userAddr) public view returns(uint256, uint256, uint256, uint256) {
        return (msg.sender.balance, registeredUsers[userAddr].seedBalance, registeredUsers[userAddr].privateBalance, registeredUsers[userAddr].publicBalance);
    }

    function getUserInfo(address user) public view returns(User memory) {
        return registeredUsers[user];
    }

    // не принимает параметров. Выводит количество десятичных знаков у токена 
    function decimals() public view virtual override returns (uint8) {
        return 10;
    }

    // не принимает входных параметров. Обновляет время жизни системы, и если время жизни совпадает с одной из фаз, то устанавливает
    // условия для данной фазы: переводит токены соответствующиму провайдеру фазы, устанавливает максимальную стоимость токена и лимит
    // на перевод
    function checkTime() private {
        uint lifeTime = (block.timestamp + Time_dif) - Time_start;

        if ((lifeTime > 300)  && (currentPhase != Phases.Private)) {
            currentPhase = Phases.Private;

            tokenPrice = 0.00075 ether;
            maxAmount = 50_000 * token;

            registeredUsers[owner].privateBalance -= 4_000_000 * token;
            registeredUsers[0xCd2d2260B689fB51014970F7c4F42C52bbe622bA].privateBalance += 4_000_000 * token;
            _transfer(owner, 0xCd2d2260B689fB51014970F7c4F42C52bbe622bA, 4_000_000 * token);
        } else if ((lifeTime > 600) && (currentPhase != Phases.Public)) {
            currentPhase = Phases.Public;

            tokenPrice = 0.005 ether;
            maxAmount = 7_500 * token;

            registeredUsers[owner].publicBalance -= 5_000_000 * token;
            registeredUsers[0xA91333A2e045a46Ae332685b862F5B5D6b786E64].publicBalance += 5_000_000 * token;
            _transfer(owner, 0xA91333A2e045a46Ae332685b862F5B5D6b786E64, 5_000_000 * token);
        }
    }
}