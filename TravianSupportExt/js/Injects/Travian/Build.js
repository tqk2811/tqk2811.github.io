class Build {
    static Render() {
        if (window.Instance.Gid) {
            switch (window.Instance.Gid) {
                case Building.Barracks:
                case Building.Stable:
                case Building.GreatBarracks:
                case Building.GreatStable:
                case Building.Workshop:
                case Building.Hospital:
                case Building.Smithy: {
                    Build.TrainTimer();
                    break;
                }
                case Building.Marketplace: {
                    Build.Marketplace();
                    break;
                }
            }
        }
    }
    //---------------------------troop training---------------------------------
    static TrainTimer() {
        let server = ServerData.Load();
        let account = AccountData.GetCurrent();
        $("#build .trainUnits .innerTroopWrapper .details").each(function () {
            let unit = $(this).find("img.unit");
            let resourceWrappers = $(this).find(".resourceWrapper .resource").get();
            let class_ = unit.attr("class");
            let unit_id = Number(class_.match(/u([0-9]+)/)[1]);
            let name = unit.attr("alt");
            let resources = [0, 0, 0, 0];
            for (let i = 0; i < 4; i++) {
                resources[i] = Number($(resourceWrappers[i]).find("span.value").text());
            }
            let troop = new Troop();
            troop.Name[window.Travian.Game.language] = name;
            troop.Resources = Resources.FromNumArray4(resources);
            server.Troops[unit_id] = troop;
            let state_showOnMarket = account.CheckboxData[`cb_troopShowOnMarket_${unit_id}`];
            if (state_showOnMarket == null)
                state_showOnMarket = false;
            let cb_showOnMarket = new SaveCheckBoxElement(state_showOnMarket, "Show on market", function (state) {
                let account = AccountData.GetCurrent();
                account.CheckboxData[`cb_troopShowOnMarket_${unit_id}`] = state;
                account.Save();
            });
            $(this).find(".tit").append(cb_showOnMarket);
        });
        server.Save();
        $("#build_value tbody").each(function () {
            let village = VillageData.GetCurrent();
            let state = village.TroopTrains[window.Instance.Gid]?.IsEnable;
            if (state == null)
                state = false;
            let tr_cb = document.createElement("tr");
            let th_cb = document.createElement("th");
            let cb = new SaveCheckBoxElement(state, "Show", function (state) {
                let village = VillageData.GetCurrent();
                if (!village.TroopTrains[window.Instance.Gid])
                    village.TroopTrains[window.Instance.Gid] = new TroopTrain();
                village.TroopTrains[window.Instance.Gid].IsEnable = state;
                village.Save();
            });
            th_cb.appendChild(cb);
            tr_cb.appendChild(th_cb);
            let tr_shortcut = document.createElement("tr");
            let th_shortcut = document.createElement("th");
            th_shortcut.className = "tjs-fast-click";
            if (account.CheckboxData["cb_fastclick"] == undefined)
                account.CheckboxData["cb_fastclick"] = false;
            let cb_fastclick = new SaveCheckBoxElement(account.CheckboxData["cb_fastclick"], "Fast click", function (state) {
                let account = AccountData.GetCurrent();
                account.CheckboxData["cb_fastclick"] = state;
                account.Save();
            });
            th_shortcut.appendChild(cb_fastclick);
            $(".build form .unit").each(function () {
                let current = $(this);
                let img = document.createElement("img");
                img.className = this.className;
                img.onclick = function () {
                    current.closest(".details").find(".cta a").trigger("click");
                    let account = AccountData.GetCurrent();
                    if (account.CheckboxData["cb_fastclick"])
                        $("form button.startTraining").trigger("click");
                };
                th_shortcut.appendChild(img);
            });
            tr_shortcut.appendChild(th_shortcut);
            this.insertAdjacentElement("afterbegin", tr_shortcut);
            this.insertAdjacentElement("afterbegin", tr_cb);
        });
    }
    //---------------------------troop training---------------------------------
    static Marketplace() {
        Build.Marketplace_SendResourcesTab();
    }
    static Marketplace_SendResourcesTab() {
        $("#enterVillageName").each(function () {
            let t = this;
            //datalist for enterVillageName
            let datalist = document.createElement("datalist");
            datalist.id = "tjs_villageDataList";
            window.Instance.e_Villages.forEach(function (val) {
                if ($(val).hasClass("active"))
                    return;
                let option = document.createElement("option");
                option.value = $(val).find(".name").text();
                datalist.appendChild(option);
            });
            document.body.appendChild(datalist);
            let func_Render_destinationSelect = function () {
                $("#build .destinationSelect").addClass("tjs_enterVillageName");
                $("#enterVillageName")
                    .attr("list", "tjs_villageDataList")
                    .closest("tr")
                    .append(`<td><img src="${window.TsResources.svg_close}" class="tjs-svg" onclick="$('#enterVillageName').val('')"></td>`);
            };
            func_Render_destinationSelect();
            $(document).on("DOMNodeInserted", "#build .destinationSelect:not(.tjs_enterVillageName)", func_Render_destinationSelect);
        });
    }
    static Marketplace_DataList_enterVillageName() {
    }
}
