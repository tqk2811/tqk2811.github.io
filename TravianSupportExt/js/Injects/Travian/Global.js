class Global {
    static Init_SidebarBox_ActiveVillage() {
        if (!window.Instance.isPlus) {
            let workshop = $("a.layoutButton.workshop.gold");
            if (!workshop.hasClass("disable")) {
                workshop.removeClass("gold");
                workshop.addClass("green");
                workshop.off("click");
                workshop.on("click", function () { window.location.href = "/build.php?gid=" + Building.Workshop; });
            }
            let stable = $("a.layoutButton.stable.gold");
            if (!stable.hasClass("disable")) {
                stable.removeClass("gold");
                stable.addClass("green");
                stable.off("click");
                stable.on("click", function () { window.location.href = "/build.php?gid=" + Building.Stable; });
            }
            let barracks = $("a.layoutButton.barracks.gold");
            if (!barracks.hasClass("disable")) {
                barracks.removeClass("gold");
                barracks.addClass("green");
                barracks.off("click");
                barracks.on("click", function () { window.location.href = "/build.php?gid=" + Building.Barracks; });
            }
            let market = $("a.layoutButton.market.gold");
            if (!market.hasClass("disable")) {
                market.removeClass("gold");
                market.addClass("green");
                market.off("click");
                market.on("click", function () { window.location.href = "/build.php?gid=" + Building.Marketplace; });
            }
        }
        $("#sidebarBoxActiveVillage .content .loyalty").each(function () {
            let select = document.createElement("select");
            for (let key in VillageAdvanced) {
                if (isNaN(Number(key))) {
                    let option = document.createElement("option");
                    option.value = VillageAdvanced[key];
                    option.innerText = key;
                    select.appendChild(option);
                }
            }
            select.value = AccountData.GetCurrent().VillageAdvanced.toString();
            let select_onchange = function () {
                let account = AccountData.GetCurrent();
                account.VillageAdvanced = Number(select.value);
                account.Save();
                $("ts-village-row-adv").each(function () { this.remove(); });
                Global.Villagelist_RenderVillageRowAdv(account);
            };
            select.onchange = select_onchange;
            $(this).get()[0].insertAdjacentElement("afterbegin", select);
            HotKeys.Push(81, function () {
                let val_str = VillageAdvanced[Number(select.value) + 1];
                let val = VillageAdvanced.None;
                if (val_str)
                    val = Number(select.value) + 1;
                select.value = val.toString();
                select_onchange();
            });
            let img_setting = document.createElement("img");
            img_setting.src = window.TsResources.svg_setting;
            img_setting.className = "tjs-svg";
            $(this).get()[0].insertAdjacentElement("afterbegin", img_setting);
        });
    }
    static Init_SidebarBox_Linklist() {
        $("#sidebarBoxLinklist .header .buttonsWrapper").each(function () {
            let a = document.createElement("a");
            a.className = "layoutButton buttonFramed withIcon round forum green";
            a.href = "#";
            a.onclick = function () { };
            let img = document.createElement("img");
            img.src = window.TsResources.svg_forum;
            a.appendChild(img);
            this.appendChild(a);
        });
        $("#sidebarBoxLinklist .content").each(function () {
            let account = AccountData.GetCurrent();
            if (account.LinkedList &&
                account.LinkedList.length > 0 &&
                $("#sidebarBoxLinklist .content .linklistNotice").length > 0) {
                $(this).find(".linklistNotice").first().remove();
                let ul_linkerlist = document.createElement("ul");
                this.appendChild(ul_linkerlist);
                account.LinkedList.forEach(element => {
                    let li = document.createElement("li");
                    let aTag = document.createElement('a');
                    aTag.href = element.Url;
                    aTag.innerText = element.Name;
                    li.appendChild(aTag);
                    ul_linkerlist.appendChild(li);
                });
            }
            let cb_data = account.CheckboxData["sidebarBoxLinklist_bringToTop"];
            if (cb_data == null)
                cb_data = false;
            if (cb_data)
                $("#sidebarBoxLinklist").get()[0]?.MoveElementUp(5); //move to top
            else
                $("#sidebarBoxLinklist").get()[0]?.MoveElementDown(5); // back to bot
            let checkbox_linkerlisttop = new SaveCheckBoxElement(cb_data, "Bring to top", function (state) {
                let account = AccountData.GetCurrent();
                account.CheckboxData["sidebarBoxLinklist_bringToTop"] = state;
                account.Save();
                if (state)
                    $("#sidebarBoxLinklist").get()[0]?.MoveElementUp(5); //move to top
                else
                    $("#sidebarBoxLinklist").get()[0]?.MoveElementDown(5); // back to bot
            });
            this.appendChild(checkbox_linkerlisttop);
        });
    }
    //----------------------Villagelist------------------------------------------
    static Init_SidebarBox_Villagelist() {
        Global.Villagelist_RenderCulture();
        Global.Villagelist_RenderVillageRowAdv(AccountData.GetCurrent());
    }
    static Villagelist_RenderVillageRowAdv(account) {
        if (account.VillageAdvanced != VillageAdvanced.None) {
            $("#sidebarBoxVillagelist .villageList .listEntry").each(function () {
                let village = VillageData.Load(parseInt(this.getAttribute("data-did")));
                switch (account.VillageAdvanced) {
                    case VillageAdvanced.Build:
                        Global.Villagelist_Show_Build(this, village);
                        break;
                    case VillageAdvanced.TroopTrains:
                        Global.Villagelist_Show_TroopTrain(this, village);
                        break;
                    case VillageAdvanced.Celebration:
                        Global.Villagelist_Show_Celebration(this, village);
                        break;
                    case VillageAdvanced.Resource:
                        Global.Villagelist_Show_Resource(this, village);
                        break;
                    case VillageAdvanced.AttackRed:
                        Global.Villagelist_Show_AttackRed(this, village);
                        break;
                }
            });
        }
    }
    static Villagelist_RenderCulture() {
        let slots = $(".expansionSlotInfo .boxTitle .slots").text().getASCII().match(/\d+\/\d+$/);
        let tooltip_text = $(".expansionSlotInfo").get()[0]._travianTooltip.text.getASCII().match(/\d+\/\d+$/);
        $(".expansionSlotInfo .boxTitle").html(slots + " (" + tooltip_text + ")");
        let village = VillageData.GetCurrent();
        if (village.CelebrationEndTime && village.CelebrationEndTime > 0) {
            let timer = new TsTimerElement();
            timer.NavigateUrl = `/build.php?gid=${Building.TownHall}`;
            timer.IsSound = false;
            timer.EndIime = village.CelebrationEndTime;
            timer.Init();
            $(".expansionSlotInfo .boxTitle").get()[0].insertAdjacentElement("beforebegin", timer);
        }
    }
    static Villagelist_Show_Build(row, village) {
        let elements = [];
        let index = 0;
        village.BuildsEndTime.forEach((val) => {
            if (val < Date.now() || index == 3)
                return;
            let timer = new TsTimerElement();
            timer.IsSound = true;
            timer.EndIime = val;
            timer.Color = Global._build_Color[index++];
            timer.Init();
            elements.push(timer);
        });
        if (village.DemolishEndTime && village.DemolishEndTime > Date.now()) {
            let timer = new TsTimerElement();
            timer.IsSound = true;
            timer.EndIime = village.DemolishEndTime;
            timer.Color = "Red";
            timer.NavigateUrl = `/build.php?newdid=${village.VillageId}&gid=${Building.MainBuilding}`;
            timer.Init();
            elements.push(timer);
        }
        let row_adv = new VillageRowAdv(elements);
        row_adv.style.gridTemplateColumns = "repeat(4, 1fr)";
        row.appendChild(row_adv);
    }
    static Villagelist_Show_TroopTrain(row, village) {
        let elements = [];
        for (let key in village.TroopTrains) {
            let val = village.TroopTrains[key];
            let building = Number(key);
            if (val.IsEnable) {
                let timer = new TsTimerElement();
                timer.IsSound = true;
                timer.EndIime = val.EndTime;
                timer.Color = TroopTrain_Data[building].color;
                timer.AdvText = TroopTrain_Data[building].name + ":%s";
                timer.NavigateUrl = `/build.php?newdid=${village.VillageId}&gid=${building}`;
                timer.Init();
                elements.push(timer);
            }
        }
        let row_adv = new VillageRowAdv(elements);
        row_adv.style.gridTemplateColumns = "repeat(5, 1fr)";
        row.appendChild(row_adv);
    }
    static Villagelist_Show_Celebration(row, village) {
        let elements = [];
        if (village.CelebrationEndTime && village.CelebrationEndTime > 0) {
            let timer = new TsTimerElement();
            timer.NavigateUrl = `/build.php?newdid=${village.VillageId}&gid=${Building.TownHall}`;
            timer.IsSound = false;
            timer.EndIime = village.CelebrationEndTime;
            timer.Init();
            elements.push(timer);
        }
        let row_adv = new VillageRowAdv(elements);
        row_adv.style.gridTemplateColumns = "repeat(1, 1fr)";
        row.appendChild(row_adv);
    }
    static Villagelist_Show_Resource(row, village) {
        let elements = [];
        for (let key in village.Resources) {
            let span = document.createElement("span");
            span.innerText = village.Resources[key].toLocaleString();
            span.style.textAlign = "right";
            elements.push(span);
        }
        let row_adv = new VillageRowAdv(elements);
        row_adv.style.gridTemplateColumns = "repeat(4, 1fr)";
        row.appendChild(row_adv);
    }
    static Villagelist_Show_AttackRed(row, village) {
        let elements = [];
        if (village.AttackCount > 0) {
            let timer = new TsTimerElement();
            timer.NavigateUrl = `/build.php?newdid=${village.VillageId}&gid=${Building.RallyPoint}&tt=1&filter=1&subfilters=1`;
            timer.Color = "Red";
            timer.AdvText = `${village.AttackCount} in %s`;
            timer.IsSound = false;
            timer.EndIime = village.AttackFirstEndTime;
            timer.Init();
            elements.push(timer);
        }
        let row_adv = new VillageRowAdv(elements);
        row_adv.style.gridTemplateColumns = "repeat(1, 1fr)";
        row.appendChild(row_adv);
    }
    //----------------------Villagelist------------------------------------------
    static Init_ResourceWrapper() {
        let func = function () {
            let vals = $(this).find(":is(.resource, .resources) span");
            //if(vals.length < 4) vals = $(this).find(".resources span");
            if (vals.length < 4)
                return;
            let total = 0;
            total += Number(vals[0].innerText);
            total += Number(vals[1].innerText);
            total += Number(vals[2].innerText);
            total += Number(vals[3].innerText);
            $(this)
                .addClass("tjs-resourceWrapper")
                .append(`<div class="inlineIcon resource tjs-resourceWrapper"><span class="value value">∑ = ${total}</span></div>`);
        };
        $(".resourceWrapper").each(func);
        $(document).on("DOMNodeInserted", ".tip-contents .resourceWrapper:not(.tjs-resourceWrapper)", func);
    }
}
Global._build_Color = ["Blue", "BlueGray", "Gray"];
