//-------------------------------------account-------------------------------------
var VillageAdvanced;
(function (VillageAdvanced) {
    VillageAdvanced[VillageAdvanced["None"] = 0] = "None";
    VillageAdvanced[VillageAdvanced["Build"] = 1] = "Build";
    VillageAdvanced[VillageAdvanced["TroopTrains"] = 2] = "TroopTrains";
    VillageAdvanced[VillageAdvanced["Celebration"] = 3] = "Celebration";
    VillageAdvanced[VillageAdvanced["Resource"] = 4] = "Resource";
    VillageAdvanced[VillageAdvanced["AttackRed"] = 5] = "AttackRed";
})(VillageAdvanced || (VillageAdvanced = {}));
class LinkedList {
}
class TroopResource {
}
//-------------------------------------village-------------------------------------
var Building;
(function (Building) {
    Building[Building["None"] = 0] = "None";
    Building[Building["Woodcutter"] = 1] = "Woodcutter";
    Building[Building["ClayPit"] = 2] = "ClayPit";
    Building[Building["IronMine"] = 3] = "IronMine";
    Building[Building["Cropland"] = 4] = "Cropland";
    Building[Building["Sawmill"] = 5] = "Sawmill";
    Building[Building["Brickyard"] = 6] = "Brickyard";
    Building[Building["IronFoundry"] = 7] = "IronFoundry";
    Building[Building["GrainMill"] = 8] = "GrainMill";
    Building[Building["Bakery"] = 9] = "Bakery";
    Building[Building["Warehouse"] = 10] = "Warehouse";
    Building[Building["Granary"] = 11] = "Granary";
    //Amory was remove
    Building[Building["Smithy"] = 13] = "Smithy";
    Building[Building["TournamentSquare"] = 14] = "TournamentSquare";
    Building[Building["MainBuilding"] = 15] = "MainBuilding";
    Building[Building["RallyPoint"] = 16] = "RallyPoint";
    Building[Building["Marketplace"] = 17] = "Marketplace";
    Building[Building["Embassy"] = 18] = "Embassy";
    Building[Building["Barracks"] = 19] = "Barracks";
    Building[Building["Stable"] = 20] = "Stable";
    Building[Building["Workshop"] = 21] = "Workshop";
    Building[Building["Academy"] = 22] = "Academy";
    Building[Building["Cranny"] = 23] = "Cranny";
    Building[Building["TownHall"] = 24] = "TownHall";
    Building[Building["Residence"] = 25] = "Residence";
    Building[Building["Palace"] = 26] = "Palace";
    Building[Building["Treasury"] = 27] = "Treasury";
    Building[Building["TradeOffice"] = 28] = "TradeOffice";
    Building[Building["GreatBarracks"] = 29] = "GreatBarracks";
    Building[Building["GreatStable"] = 30] = "GreatStable";
    Building[Building["CityWall"] = 31] = "CityWall";
    Building[Building["EarthWall"] = 32] = "EarthWall";
    Building[Building["Palisade"] = 33] = "Palisade";
    Building[Building["StonemasonLodge"] = 34] = "StonemasonLodge";
    Building[Building["Brewery"] = 35] = "Brewery";
    Building[Building["Trapper"] = 36] = "Trapper";
    Building[Building["HeroMansion"] = 37] = "HeroMansion";
    Building[Building["GreatWarehouse"] = 38] = "GreatWarehouse";
    Building[Building["GreatGranary"] = 39] = "GreatGranary";
    Building[Building["WonderOfTheWorld"] = 40] = "WonderOfTheWorld";
    Building[Building["HorseDrinkingTrough"] = 41] = "HorseDrinkingTrough";
    Building[Building["StoneWall"] = 42] = "StoneWall";
    Building[Building["CommandCenter"] = 43] = "CommandCenter";
    Building[Building["MakeshiftWall"] = 44] = "MakeshiftWall";
    Building[Building["Waterworks"] = 45] = "Waterworks";
    Building[Building["Hospital"] = 46] = "Hospital";
})(Building || (Building = {}));
class TroopTrain {
    constructor() {
        this.IsEnable = false;
        this.EndTime = 0;
    }
}
const TroopTrain_Data = {
    [Building.Barracks]: { color: "#0069FF", name: "b" },
    [Building.GreatBarracks]: { color: "#78A5D3", name: "B" },
    [Building.Stable]: { color: "#7700F6", name: "s" },
    [Building.GreatStable]: { color: "#C574F3", name: "S" },
    [Building.Workshop]: { color: "#C84545", name: "w" },
};
class Resources {
    constructor(lumber, claypit, iron, crop) {
        this.Lumber = lumber;
        this.Claypit = claypit;
        this.Iron = iron;
        this.Crop = crop;
    }
    static FromNumArray4(arr) {
        return new Resources(arr[0], arr[1], arr[2], arr[3]);
    }
}
class Troop {
    constructor() {
        this.Name = {};
        this.Resources = new Resources(0, 0, 0, 0);
    }
}
class Hero {
}
