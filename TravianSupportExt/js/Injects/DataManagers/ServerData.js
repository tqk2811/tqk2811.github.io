class ServerData {
    constructor(serverData) {
        this.serverData = serverData;
        //this.Troops = new Array<Troop>();
        this.Heros = {};
        this.Save();
    }
    get Troops() { return this.serverData.Troops; }
    get Heros() { return this.serverData.Heros; }
    set Heros(val) { this.serverData.Heros = val; }
    Save() {
        localStorage.setItem("TsServer", JSON.stringify(this.serverData));
    }
    static Load() {
        let data = localStorage.getItem("TsServer");
        if (data) {
            let accountData = JSON.parse(data);
            return new ServerData(accountData);
        }
        else
            return new ServerData({
                Heros: {},
                Troops: {}
            });
    }
}
