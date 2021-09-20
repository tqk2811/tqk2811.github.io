class AccountData {
    constructor(accountData) {
        this.accountData = accountData;
    }
    get UserName() { return this.accountData.UserName; }
    get LinkedList() { return this.accountData.LinkedList; }
    //public set LinkedList(val :LinkedList[]){ this.accountData.LinkedList = val; }
    get CheckboxData() { return this.accountData.CheckboxData; }
    get VillageAdvanced() { return this.accountData.VillageAdvanced; }
    set VillageAdvanced(val) { this.accountData.VillageAdvanced = val; }
    Save() {
        localStorage.setItem("TsAccount_" + this.accountData.UserName, JSON.stringify(this.accountData));
    }
    static Load(userName) {
        if (!userName || userName == '')
            throw new Error("userName is null/undefined");
        let data = localStorage.getItem("TsAccount_" + userName);
        if (data) {
            let accountData = JSON.parse(data);
            return new AccountData(accountData);
        }
        else
            return new AccountData({
                UserName: userName,
                LinkedList: [
                    { Name: "Green Attack Report", Url: "/report/offensive?opt=AAABAA==", openNewTab: false },
                ],
                CheckboxData: {},
                VillageAdvanced: VillageAdvanced.Build
            });
    }
    static GetCurrent() {
        return AccountData.Load(window.Instance.UserName);
    }
}
