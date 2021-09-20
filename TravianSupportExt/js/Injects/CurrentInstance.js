class CurrentInstance {
    constructor() {
        this._UserName = $("#sidebarBoxActiveVillage .playerName").text();
        this._e_build = document.getElementById("build");
        this._e_sidebarBoxVillagelist = document.getElementById("sidebarBoxVillagelist");
        if (this._e_sidebarBoxVillagelist) {
            this._e_Villages = this._e_sidebarBoxVillagelist.querySelectorAll(".villageList div.listEntry");
            this._e_ActiveVillage = this._e_sidebarBoxVillagelist.querySelector(".villageList div.listEntry.active");
            if (this._e_ActiveVillage) {
                this._villageId = parseInt(this._e_ActiveVillage.getAttribute("data-did"));
            }
        }
        if (this._e_build) {
            let gid_str = this.e_build.getAttribute("class").split(" ")[0];
            this._Gid = Number(gid_str.substring(3, gid_str.length));
        }
        else
            this._Gid = Building.None;
        this._isPlus = document.querySelector("#sidebarBoxActiveVillage a.layoutButton.green") != null;
        this._e_TabMains = document.querySelectorAll(".contentNavi a.tabItem");
        this._e_ActiveTabMain = document.querySelector(".contentNavi a.tabItem.active");
        this._e_TabSubs = document.querySelectorAll(".contentNavi div.container");
        this._e_ActiveTabSub = document.querySelector(".contentNavi div.container.active");
        console.log("TravianSupport Ext: UserName:" + this._UserName
            + ", isPlus:" + this._isPlus
            + ", Gid:" + this._Gid
            + ", VillageId:" + this._villageId);
    }
    get UserName() {
        return this._UserName;
    }
    get villageId() {
        return this._villageId;
    }
    get Gid() {
        return this._Gid;
    }
    get isPlus() {
        return this._isPlus;
    }
    get e_build() {
        return this._e_build;
    }
    get e_sidebarBoxVillagelist() {
        return this._e_sidebarBoxVillagelist;
    }
    get e_Villages() {
        return this._e_Villages;
    }
    get e_ActiveVillage() {
        return this._e_ActiveVillage;
    }
    get e_TabMains() {
        return this._e_TabMains;
    }
    get e_ActiveTabMain() {
        return this._e_ActiveTabMain;
    }
    get e_TabSubs() {
        return this._e_TabSubs;
    }
    get e_ActiveTabSub() {
        return this._e_ActiveTabSub;
    }
}
