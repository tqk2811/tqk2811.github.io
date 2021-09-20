var TimerState;
(function (TimerState) {
    TimerState[TimerState["Running"] = 0] = "Running";
    TimerState[TimerState["Stopped"] = 1] = "Stopped";
})(TimerState || (TimerState = {}));
var TimerCounting;
(function (TimerCounting) {
    TimerCounting[TimerCounting["Up"] = 0] = "Up";
    TimerCounting[TimerCounting["Down"] = 1] = "Down";
})(TimerCounting || (TimerCounting = {}));
class TsTimerElement extends HTMLElement {
    constructor() {
        super();
        this.className = "tsTimer";
        this.State = TimerState.Running;
        this.Counting = TimerCounting.Down;
        this.isLoaded = false;
        this.AdvText = "%s";
        this.IsEnd = false;
    }
    Init() {
        let e = this;
        if (this.Color)
            this.style.color = this.Color;
        if (this.NavigateUrl)
            this.onclick = function () { location.href = e.NavigateUrl; };
    }
    static Start() {
        if (!TsTimerElement.intervalHandle) {
            TsTimerElement.audio = document.createElement("audio");
            TsTimerElement.audio.src = window.TsResources.ding_sound;
            TsTimerElement.audio.loop = false;
            document.body.appendChild(TsTimerElement.audio);
            TsTimerElement.intervalHandle = window.setInterval(TsTimerElement.TimerInterval, 1000);
        }
    }
    static TimerInterval() {
        $("ts-timer.tsTimer").each(function () {
            let timerElement = this;
            if (timerElement.State == TimerState.Stopped)
                return;
            let current = Date.now();
            if ((timerElement.Counting == TimerCounting.Up && current >= timerElement.EndIime) ||
                (timerElement.Counting == TimerCounting.Down && current <= timerElement.EndIime)) {
                let diff = Math.abs(current - timerElement.EndIime);
                if (timerElement.IsSound && diff <= 1000)
                    TsTimerElement.audio.play();
                timerElement.innerText = timerElement.AdvText.format(diff.GetTimeTextFromMiliSecondLeft());
                timerElement.isLoaded = true;
            }
            else if (!timerElement.isLoaded || !timerElement.IsEnd) {
                timerElement.innerText = timerElement.AdvText.format("00:00");
                timerElement.isLoaded = true;
                timerElement.IsEnd = true;
            }
        });
    }
}
customElements.define('ts-timer', TsTimerElement);
