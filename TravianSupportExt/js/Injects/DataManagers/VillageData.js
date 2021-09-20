class VillageData {
    constructor(villageData) {
        this.villageData = villageData;
    }
    get VillageId() { return this.villageData.VillageId; }
    ;
    get BuildsEndTime() { return this.villageData.BuildsEndTime; }
    //private set BuildsEndTime(val:number[]){ this.villageData.BuildsEndTime = val; }
    get DemolishEndTime() { return this.villageData.DemolishEndTime; }
    //private set DemolishEndTime(val:number){ this.villageData.DemolishEndTime = val; }
    get TroopTrains() { return this.villageData.TroopTrains; }
    //private set TroopTrains(val: TroopTrains){ this.villageData.TroopTrains = val; }
    get CelebrationEndTime() { return this.villageData.CelebrationEndTime; }
    set CelebrationEndTime(val) { this.villageData.CelebrationEndTime = val; } //update from load /village/statistics
    get Storage() { return this.villageData.Storage; }
    //private set Storage(val:number){ this.villageData.Storage = val; }
    get Granary() { return this.villageData.Granary; }
    //private set Granary(val:number){ this.villageData.Granary = val; }
    get Resources() { return this.villageData.Resources; }
    set Resources(val) { this.villageData.Resources = val; } //update from load /village/statistics
    get LastUpdateAt() { return this.villageData.LastUpdateAt; }
    //private set LastUpdateAt(val:number){ this.villageData.LastUpdateAt = val; }
    get AttackCount() { return this.villageData.AttackCount; }
    //private set AttackCount(val:number){ this.villageData.AttackCount = val; }
    get AttackFirstEndTime() { return this.villageData.AttackFirstEndTime; }
    //private set AttackFirstEndTime(val:number){ this.villageData.AttackFirstEndTime = val; }
    Read() {
        this.villageData.Storage = Number($("#stockBar .warehouse .capacity .value").text().getASCII().replaceAll(".", "").replaceAll(",", ""));
        this.villageData.Granary = Number($("#stockBar .granary .capacity .value").text().getASCII().replaceAll(".", "").replaceAll(",", ""));
        this.Resources = new Resources(Number($("#l1").text().trim().getASCII().replaceAll(".", "").replaceAll(",", "")), Number($("#l2").text().trim().getASCII().replaceAll(".", "").replaceAll(",", "")), Number($("#l3").text().trim().getASCII().replaceAll(".", "").replaceAll(",", "")), Number($("#l4").text().trim().getASCII().replaceAll(".", "").replaceAll(",", "")));
        switch (window.Instance.Gid) {
            case Building.None:
                {
                    this.ReadNonBuilding();
                    break;
                }
            case Building.Barracks:
            case Building.GreatBarracks:
            case Building.Stable:
            case Building.GreatStable:
            case Building.Smithy:
            case Building.Workshop:
            case Building.Hospital:
            case Building.TownHall:
                {
                    let val = $(".under_progress td.dur span.timer").last().attr("value");
                    if (val && val != '') {
                        switch (window.Instance.Gid) {
                            case Building.TownHall:
                                this.CelebrationEndTime = Date.now() + (Number(val) * 1000);
                                break;
                            default:
                                if (!this.TroopTrains[window.Instance.Gid])
                                    this.TroopTrains[window.Instance.Gid] = new TroopTrain();
                                this.TroopTrains[window.Instance.Gid].EndTime = Date.now() + (Number(val) * 1000);
                                break;
                        }
                    }
                    break;
                }
            case Building.MainBuilding:
                {
                    let val = $("#demolish .timer").attr("value");
                    if (val && val != '') {
                        this.villageData.DemolishEndTime = Date.now() + (Number(val) * 1000);
                    }
                }
        }
    }
    ReadNonBuilding() {
        switch (window.location.pathname) {
            case "/dorf1.php":
            case "/dorf2.php":
                {
                    let builds = new Array();
                    $(".buildDuration .timer").each(function (i, e) { builds.push(Number($(this).attr("value")) * 1000 + Date.now()); });
                    this.villageData.BuildsEndTime = builds;
                    //count attack comming
                    let attack_count = 0;
                    let attack_endTime = 0;
                    $("#movements tr").each(function (i, e) {
                        let a1 = $(this).find(".mov .a1");
                        let timer = $(this).find(".dur_r .timer");
                        let count = Number(a1.text().match(/\d+/g));
                        let timeLeft = Number(timer.attr("value"));
                        if (!Number.isNaN(timeLeft) && !Number.isNaN(count)) {
                            attack_count = count;
                            attack_endTime = timeLeft * 1000 + Date.now();
                        }
                    });
                    this.villageData.AttackCount = attack_count;
                    this.villageData.AttackFirstEndTime = attack_endTime;
                    break;
                }
        }
    }
    Save() {
        this.villageData.LastUpdateAt = Date.now();
        localStorage.setItem("TsVillage_" + this.villageData.VillageId, JSON.stringify(this.villageData));
    }
    static Load(villageId) {
        if (!villageId)
            throw new Error("villageId is null/undefined");
        let data = localStorage.getItem("TsVillage_" + villageId);
        if (data) {
            let villageData = JSON.parse(data);
            //check
            if (!villageData.VillageId)
                villageData.VillageId = villageId;
            if (!villageData.BuildsEndTime)
                villageData.BuildsEndTime = [];
            if (!villageData.TroopTrains)
                villageData.TroopTrains = {};
            if (!villageData.Resources)
                villageData.Resources = new Resources(0, 0, 0, 0);
            return new VillageData(villageData);
        }
        else
            return new VillageData({
                VillageId: villageId,
                BuildsEndTime: [],
                DemolishEndTime: 0,
                TroopTrains: {},
                CelebrationEndTime: 0,
                Storage: 0,
                Granary: 0,
                Resources: new Resources(0, 0, 0, 0),
                LastUpdateAt: 0,
                AttackCount: 0,
                AttackFirstEndTime: 0
            });
    }
    static GetCurrent() {
        return VillageData.Load(window.Instance.villageId);
    }
}
