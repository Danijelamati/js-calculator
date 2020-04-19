function Display(props) {
  return (
    React.createElement("div", { id: "disp", className: "text-right" },
    React.createElement("h4", null, props.equation),
    React.createElement("h3", { id: "display" }, props.input)));


};

function Buttons(props) {
  return (
    React.createElement("div", { id: "layout", class: "row" },

    React.createElement("button", { id: "clear", class: "btn col-6", onClick: props.clearDisplay }, "AC"),


    React.createElement("button", { id: "divide", class: "btn col-3", value: "/", onClick: props.handleOperators }, "/"),


    React.createElement("button", { id: "multiply", class: "btn col-3", value: "*", onClick: props.handleOperators }, "*"),




    React.createElement("button", { id: "nine", class: "btn col-3", value: "9", onClick: props.handleNums }, "9"),


    React.createElement("button", { id: "eight", class: "btn col-3", value: "8", onClick: props.handleNums }, "8"),


    React.createElement("button", { id: "seven", class: "btn col-3", value: "7", onClick: props.handleNums }, "7"),


    React.createElement("button", { id: "subtract", class: "btn col-3", value: "-", onClick: props.handleOperators }, "-"),




    React.createElement("button", { id: "six", class: "btn col-3", value: "6", onClick: props.handleNums }, "6"),


    React.createElement("button", { id: "five", class: "btn col-3", value: "5", onClick: props.handleNums }, "5"),


    React.createElement("button", { id: "four", class: "btn col-3", value: "4", onClick: props.handleNums }, "4"),


    React.createElement("button", { id: "add", class: "btn col-3", value: "+", onClick: props.handleOperators }, "+"),




    React.createElement("button", { id: "three", class: "btn col-3", value: "3", onClick: props.handleNums }, "3"),


    React.createElement("button", { id: "two", class: "btn col-3", value: "2", onClick: props.handleNums }, "2"),


    React.createElement("button", { id: "one", class: "btn col-3", value: "1", onClick: props.handleNums }, "1"),


    React.createElement("button", { id: "equals", class: "btn col-3", onClick: props.calculate }, "="),




    React.createElement("button", { id: "zero", class: "btn col-6", value: "0", onClick: props.handleNums }, "0"),


    React.createElement("button", { id: "decimal", class: "btn col-3", value: ".", onClick: props.handleDot }, "."),


    React.createElement("button", { class: "btn col-3" }, "DM")));





};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      equation: "",
      input: "0",
      equal: false };

    this.handleNums = this.handleNums.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleDot = this.handleDot.bind(this);
  }

  handleNums(event) {

    let currentInput = this.state.input;

    if (!/[0-9.]/.test(currentInput)) {
      currentInput = "0";
    }

    let number = currentInput + event.target.value;

    if (number.length > 1 && number.charAt(0) === "0") {
      number = number.slice(1);
    }

    this.setState({
      input: number });

  }

  handleOperators(event) {
    let currInput = this.state.input;
    let currEquation = this.state.equation;
    let operator = "";

    //////
    if (this.state.equal) {
      currEquation = this.state.input + event.target.value;

      return this.setState({
        equation: currEquation,
        input: event.target.value,
        equal: false });

    }
    ////
    if (!/[0-9.]/.test(currInput)) {

      if (event.target.value == "-") {

        if (currInput != "-") {
          currEquation = this.state.equation + event.target.value;

          return this.setState({
            input: event.target.value,
            equation: currEquation });

        }
      }
      //
      if (currInput === "-") {

        if (/[/*+]/.test(currEquation.charAt(currEquation.length - 2))) {

          currEquation = currEquation.split("").slice(0, currEquation.length - 2).join("") + event.target.value;
          return this.setState({
            equation: currEquation,
            input: event.target.value });

        }
      } //

      currEquation = currEquation.split("").slice(0, currEquation.length - 1).join("") + event.target.value;
      return this.setState({
        equation: currEquation,
        input: event.target.value });


    } //// 

    if (this.state.equation === "") {
      return this.setState({
        equation: currInput + event.target.value,
        input: event.target.value });

    }

    return this.setState({
      equation: currEquation + currInput + event.target.value,
      input: event.target.value });


  }

  calculate() {
    let equ = "";
    let res = "";

    if (this.state.equal) {

      equ = this.state.equation;
      equ = this.state.input + equ.slice(equ.search(/[/*-+]/));
      res = eval(equ).toString(10);

      return this.setState({
        equation: equ,
        input: res });

    }

    equ = this.state.equation + this.state.input;
    res = eval(equ).toString(10);

    return this.setState({
      equation: equ,
      input: res,
      equal: true });


  }

  handleDot(event) {
    if (this.state.input.search(/[.]/) === -1) {

      const re = this.state.input + event.target.value;

      return this.setState({
        input: re });

    }

  }

  clearDisplay() {
    return this.setState({
      equation: "",
      input: "0",
      equal: false });


  }

  render() {
    return (
      React.createElement("div", { id: "calculator" },
      React.createElement(Display, {
        input: this.state.input,
        equation: this.state.equation }),

      React.createElement(Buttons, {
        handleNums: this.handleNums,
        clearDisplay: this.clearDisplay,
        handleOperators: this.handleOperators,
        calculate: this.calculate,
        handleDot: this.handleDot })));



  }}
;


ReactDOM.render(React.createElement(App, null), document.getElementById("wrapper"));