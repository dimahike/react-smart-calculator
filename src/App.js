import { useEffect, useState } from 'react';
import './App.css';

const operators = ['+', '-', '*', '/'];

function App() {
  const [displayInput, setDisplayInput] = useState('0');
  const [displayInput2, setDisplayInput2] = useState('');
  const [result, setResult] = useState(0);
  const [stateEqual, setStateEqual] = useState(false);
  const [statePercent, setStatePercent] = useState(false);

  const fixedNum = (num) => {
    return Number(num.toFixed(2));
  };

  const cheackIsOperatorLast = () => {
    let isOperator = false;
    operators.forEach((operator) => {
      const lastIndex = displayInput.length - 1;

      let check = displayInput[lastIndex] === operator;
      if (check) {
        isOperator = check;
      }
    });

    return isOperator;
  };

  const checkDoteInInput = () => {
    let isOperator = false;
    const dote = '.';
    console.log('displayInput', displayInput);
    const arrDisplay = displayInput.split('');
    console.log('displayInput', displayInput, typeof displayInput);
    arrDisplay.forEach((cell) => {
      let check = cell === dote;
      if (check) {
        isOperator = check;
      }
    });

    return isOperator;
  };

  useEffect(() => {
    const isOperatorLast = cheackIsOperatorLast();
    let resultCode;

    if (!isOperatorLast) {
      eval(`resultCode = ${displayInput2} ${displayInput}`);

      const numFix = fixedNum(resultCode);
      setResult(numFix);
    }
  }, [displayInput, displayInput2]);

  const printNumber = (num) => {
    if (statePercent) {
      return;
    }

    if (stateEqual) {
      setDisplayInput(num);
      setDisplayInput2('');
      setStateEqual(false);
      return;
    }

    if (displayInput === '0') {
      return setDisplayInput(`${num}`);
    }
    const isOperatorLast = cheackIsOperatorLast();
    if (isOperatorLast) {
      setDisplayInput2(`${displayInput2} ${displayInput}`);
      setDisplayInput(num);
    } else {
      setDisplayInput(`${displayInput}${num}`);
    }
  };

  const operatorCalc = (operator) => {
    const isOperatorLast = cheackIsOperatorLast();
    setStateEqual(false);

    if (isOperatorLast) {
      setDisplayInput(operator);
    } else {
      setDisplayInput2(`${displayInput2} ${displayInput}`);
      setDisplayInput(operator);
    }
  };

  const percent = () => {
    const isOperatorLast = cheackIsOperatorLast();
    setStateEqual(false);

    if (!isOperatorLast && displayInput2) {
      setStateEqual(false);
      setStatePercent(true);
      const deletedLastOperator = displayInput2.slice(0, displayInput2.length - 2);
      let resultCode;
      eval(`resultCode = ${deletedLastOperator}`);

      const resultFixed = fixedNum(resultCode);
      const percentResult = (resultFixed / 100) * displayInput;
      const percentResultFixed = fixedNum(percentResult);
      setDisplayInput(percentResultFixed);
    }
  };

  const dote = () => {
    if (stateEqual || statePercent) {
      setStateEqual(false);
      return setDisplayInput('0.');
    }
    const isOperatorLast = cheackIsOperatorLast();
    if (!isOperatorLast && !stateEqual) {
      if (displayInput === '0') {
        console.log('work111');
        setDisplayInput('0.');
      } else {
        const lastIndex = displayInput.length - 1;
        let checkDoteInTheEnd = displayInput[lastIndex] === '.';

        if (!checkDoteInTheEnd) {
          const checkDoteinFullInput = checkDoteInInput();

          if (checkDoteinFullInput) {
            setDisplayInput(`${displayInput}`);
          } else {
            setDisplayInput(`${displayInput}.`);
          }
        }
      }

      setStateEqual(false);
    } else {
    }
  };

  const remove = () => {
    setDisplayInput('0');
    setStateEqual(false);
  };

  const reset = () => {
    setDisplayInput('0');
    setDisplayInput2('');
    setStateEqual(false);
  };

  const equal = () => {
    setDisplayInput(result);
    setDisplayInput2('');
    setStateEqual(true);
  };

  return (
    <div className="app">
      <header id="header">
        <div>Calcuator</div>
      </header>
      <main id="main">
        <div className="calculate">
          <div className="row center">
            <div className="display">
              <div className="top">{`${displayInput2} ${displayInput}`}</div>
              <div className="bottom">{result}</div>
            </div>
          </div>
          <div className="key-bord row">
            <div className="item2" onClick={reset}>
              AC
            </div>
            <div className="item1" onClick={remove}>
              del
            </div>
            <div className="item3" onClick={percent}>
              %
            </div>
            <div className="item4" onClick={() => operatorCalc('/')}>
              /
            </div>

            <div className="item" onClick={() => printNumber('7')}>
              7
            </div>
            <div className="item" onClick={() => printNumber('8')}>
              8
            </div>
            <div className="item" onClick={() => printNumber('9')}>
              9
            </div>
            <div className="item" onClick={() => operatorCalc('*')}>
              *
            </div>

            <div className="item" onClick={() => printNumber('4')}>
              4
            </div>
            <div className="item" onClick={() => printNumber('5')}>
              5
            </div>
            <div className="item" onClick={() => printNumber('6')}>
              6
            </div>
            <div className="item" onClick={() => operatorCalc('-')}>
              -
            </div>

            <div className="item" onClick={() => printNumber('1')}>
              1
            </div>
            <div className="item" onClick={() => printNumber('2')}>
              2
            </div>
            <div className="item" onClick={() => printNumber('3')}>
              3
            </div>
            <div className="item" onClick={() => operatorCalc('+')}>
              +
            </div>
            <div className="item" onClick={dote}>
              .
            </div>
            <div className="item" onClick={() => printNumber('0')}>
              0
            </div>
            <div className="big" onClick={equal}>
              =
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
