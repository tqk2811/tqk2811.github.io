class HotKeys {
    static Init() {
        $(document).on("keydown", function (e) {
            if (document.activeElement.tagName == "INPUT")
                return;
            if (document.activeElement.tagName == "TEXTAREA")
                return;
            console.log("e.which:" + e.which + " | e.keyCode " + e.keyCode);
            let func = HotKeys.HotKeyList[e.which];
            if (func)
                func();
        });
    }
    static Push(code, func) {
        if (Array.isArray(code)) {
            for (let i = 0; i < code.length; i++)
                HotKeys.HotKeyList[code[i]] = func;
        }
        else
            HotKeys.HotKeyList[code] = func;
    }
}
HotKeys.HotKeyList = {};
