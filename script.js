function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function mathR(min, max) {
    return Math.random() * (max - min) + min;
  }
  class App extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      let styleH1 = {
        color: "white",
        textShadow:
        "0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black",
        fontFamily: "Monaco" };
  
      let styleComponents = {
        color: "blacke" };
  
      return(
        React.createElement(React.Fragment, null,
        React.createElement("div", null,
        React.createElement("h1", { style: styleH1, className: "text-center" }, "25 + 5 Clock")), 
  
  
  
        React.createElement("div", { style: styleComponents },
        React.createElement(Clock, null))));
  
  
  
    }}
  
  
  class Clock extends React.Component {
    constructor(props) {
      super(props);_defineProperty(this, "convertToTime",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
      count => {
        let minutes = Math.floor(count / 60);
        let seconds = count % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
  
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return minutes + ":" + seconds;
      });this.state = { breakCount: 5, sessionCount: 25, clockCount: 25 * 60, currentTimer: "Session", On: false, TapTime: 0, soundTime: 10 };this.timer = 0;this.startTimer = this.startTimer.bind(this);this.countDown = this.countDown.bind(this);this.breakPlus = this.breakPlus.bind(this);this.breakMinus = this.breakMinus.bind(this);this.sessionPlus = this.sessionPlus.bind(this);this.sessionMinus = this.sessionMinus.bind(this);this.convertToTime = this.convertToTime.bind(this);this.reset = this.reset.bind(this);this.audioRef = React.createRef();}componentDidMount() {let timeLeftVar = this.convertToTime(this.state.clockCount);this.setState({ time: timeLeftVar });}
  
    reset() {
      this.setState({
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        currentTimer: "Session",
        On: false,
        TapTime: 0,
        soundTime: 10 });
  
      clearInterval(this.timer);
      document.getElementById("beep").pause();
      document.getElementById("beep").load();
    }
    breakPlus() {
      if (this.state.On == false) {
        this.setState(state => ({
          breakCount:
          state.breakCount < 60 ?
          state.breakCount += 1 :
          state.breakCount += 0,
          clockCount:
          state.currentTimer == "Session" ?
          state.clockCount = state.sessionCount * 60 :
          state.breakCount * 60 }));
  
      }
    }
    breakMinus() {
      if (this.state.On == false) {
        this.setState(state => ({
          breakCount:
          state.breakCount > 1 ?
          state.breakCount -= 1 :
          state.breakCount += 0,
          clockCount:
          state.currentTimer == "Session" ?
          state.clockCount = state.sessionCount * 60 :
          state.breakCount * 60 }));
  
      }
    }
    sessionPlus() {
      if (this.state.On == false) {
        this.setState(state => ({
          sessionCount:
          state.sessionCount < 60 ?
          state.sessionCount += 1 :
          state.sessionCount += 0,
          clockCount:
          state.currentTimer == "Session" ?
          state.clockCount = state.sessionCount * 60 :
          state.breakCount * 60 }));
  
      }
    }
    sessionMinus() {
      if (this.state.On == false) {
        this.setState(state => ({
          sessionCount:
          state.sessionCount > 1 ?
          state.sessionCount -= 1 :
          state.sessionCount += 0,
          clockCount:
          state.currentTimer == "Session" ?
          state.clockCount = state.sessionCount * 60 :
          state.breakCount * 60 }));
  
      }
    }
  
    startTimer() {
      this.setState(state => ({
        On: state.On !== true ? state.On = true : state.On = false,
        TapTime: state.TapTime += 1 }));
  
      console.log("On2 = ", this.state.On, this.state.TapTime);
      if (
      this.state.On === false &&
      this.state.clockCount > 0 &&
      this.state.TapTime % 2 == 0)
      {
        this.timer = setInterval(this.countDown, 1000);
      } else {
        clearInterval(this.timer);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let clockCount = this.state.clockCount - 1;
      this.setState({
        clockCount: clockCount });
  
      console.log("On1 = ", this.state.On);
      // Check if we're at zero.
      if (clockCount <= 0) {
        clearInterval(this.timer);
        this.setState(state => ({
          On: state.On !== true ? state.On = true : state.On = false,
          TapTime: state.TapTime += 1,
          clockCount:
          this.state.currentTimer != "Session" ?
          this.state.sessionCount == 5 ?
          state.clockCount = state.sessionCount * 60 :
          state.clockCount = 0 :
          state.clockCount = state.breakCount * 60,
  
          TapTime: 0,
          soundTime: 10,
          On: state.On !== true ? state.On = true : state.On = false,
          currentTimer:
          state.currentTimer == "Session" ?
          state.currentTimer = mathR(0, 1000000) :
          state.currentTimer = "Session" }));
  
  
        if (this.state.soundTime <= -10) {
          this.setState(state => ({
            soundTime: 10,
            On: state.On !== true ? state.On = true : state.On = false,
            currentTimer:
            state.currentTimer == "Session" ?
            state.currentTimer = "Brek" :
            state.currentTimer = "Session",
            TapTime: state.TapTime += 1,
            clockCount:
            this.state.currentTimer != "Session" ?
            state.clockCount = state.breakCount * 60 :
            state.clockCount = state.sessionCount * 60 }));
  
          this.timer = setInterval(this.countDown, 1000);
        } else {
          console.log("soundTime = ", this.state.soundTime);
          document.getElementById("beep").play();
          this.setState(state => ({
            soundTime: state.soundTime = state.soundTime - 1 }));
  
          this.timer = setInterval(this.countDown, 1000);
        }
      }
    }
    render() {
      let styleContainer = {
        display: "flex",
        justifyContent: "space-evenly",
        margin: "1em" };
  
      console.log("On = ", this.state.On);
  
      return(
        React.createElement(React.Fragment, null,
        React.createElement("div", { style: styleContainer },
        React.createElement("div", null,
        React.createElement("h1", { id: "break-label" }, "Break"),
        React.createElement("div", { id: "buttonStyle" },
        React.createElement("button", { id: "break-decrement", onClick: this.breakMinus },
        React.createElement("i", { className: "fas fa-minus" })),
  
        React.createElement("div", { id: "break-length" }, this.state.breakCount),
        React.createElement("button", { id: "break-increment", onClick: this.breakPlus },
        React.createElement("i", { className: "fas fa-plus" })))),
  
  
  
        React.createElement("div", null,
        React.createElement("h1", { id: "session-label" }, "Session"),
        React.createElement("div", { id: "buttonStyle" },
        React.createElement("button", { id: "session-decrement", onClick: this.sessionMinus },
        React.createElement("i", { className: "fas fa-minus" })),
  
        React.createElement("div", { id: "session-length" }, this.state.sessionCount),
        React.createElement("button", { id: "session-increment", onClick: this.sessionPlus },
        React.createElement("i", { className: "fas fa-plus" }))))),
  
  
  
  
  
        React.createElement("div", { id: "line" }),
  
        React.createElement("div", { id: "timerContainer" },
        React.createElement("div", { id: "insideContainer" },
        React.createElement("div", { id: "timer-label" },
        this.state.currentTimer == "Session" ?
        "Session" :
        mathR(0, 10000000)),
  
        React.createElement("div", { id: "time-left" },
        this.convertToTime(this.state.clockCount)),
  
        React.createElement("div", { id: "TimerButtons" },
        React.createElement("button", { id: "start_stop", onClick: this.startTimer },
        this.state.On == false ?
        React.createElement("i", { className: "fas fa-play" }) :
  
        React.createElement("i", { className: "fas fa-pause" })),
  
  
        React.createElement("button", { id: "reset", onClick: this.reset },
        React.createElement("i", { className: "fas fa-undo" }))))),
  
  
  
  
        React.createElement("audio", {
          id: "beep",
          src: "https://github.com/bradtraversy/vanillawebprojects/blob/master/music-player/music/summer.mp3?raw=true" })));
  
  
  
    }}
  
  let node = document.getElementById("root");
  ReactDOM.render(React.createElement(App, null), node);