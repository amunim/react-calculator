
import mexp from "math-expression-evaluator";
import { useState, useEffect } from "react";
import CalcButton from "./CalcButton";

export default function Calculator() {
    //styled indivudually in app.css
    const buttons = [{
        label: "AC",
        id: "clear"
    },
    {
        label: "/",
        id: "divide"
    },
    {
        label: "x",
        id: "multiply"
    },
    {
        label: "7",
        id: "seven"
    },
    {
        label: "8",
        id: "eight"
    },
    {
        label: "9",
        id: "nine"
    },
    {
        label: "-",
        id: "subtract"
    },
    {
        label: "4",
        id: "four"
    },
    {
        label: "5",
        id: "five"
    },
    {
        label: "6",
        id: "six"
    },
    {
        label: "+",
        id: "add"
    },
    {
        label: "1",
        id: "one"
    },
    {
        label: "2",
        id: "two"
    },
    {
        label: "3",
        id: "three"
    },
    {
        label: "=",
        id: "equals"
    },
    {
        label: "0",
        id: "zero"
    },
    {
        label: ".",
        id: "decimal"
    },
    ]; //cannot spread arithmetic operators because order acutally matters
    const arithmeticOperators = ["/", "x", "+", "-"];

    const [formula, setFormula] = useState('');
    const [display, setDisplay] = useState('0');
    const [lastKey, setLastKey] = useState(''); //Only used after another keystroke of '=', to wrap inside useEffect for formula
    useEffect(() => {
        HandleClick(lastKey);
    }, [lastKey]);

    function HandleClick(button: string): void {
        //clear screen
        if (button === "AC") {
            setFormula('');
            setDisplay('0');

            return;
        }

        //numbers can be negative
        if (button === "-" && display.length <= 1) {

            //already negative
            if (display === "-") return;

            setDisplay(button);
            setFormula(formula.concat(button));

            return;
        }

        //handle airthmetic operators
        if (arithmeticOperators.includes(button)) {
            setDisplay('');

            if (formula.length === 0) return;

            if (formula.includes("=")) {
                setFormula(`${display}${button}`);
                return;
            }

            if (!arithmeticOperators.includes(formula.slice(-1))) //last char is not an operator
                setFormula(formula.concat(button));
            else
                if (formula.slice(-2).split('').every(x => arithmeticOperators.includes(x))) //check if negative and operator
                    setFormula(formula.slice(0, -2).concat(button));
                else
                    setFormula(formula.slice(0, -1).concat(button));


            return;
        }

        //new input after results
        if (formula.includes("=")) {
            setDisplay("0");
            setFormula("");

            if (button !== "=")
                setLastKey(button);
            return;
        }

        //handle eval
        if (button === "=") {
            try {
                const ans = mexp.eval(formula.replaceAll("x", "*"));
                setDisplay(ans);
                setFormula(formula.concat('=', ans));
            }
            catch (er) {
                console.log(er);
                console.log(formula.replaceAll("x", "*"));
                setDisplay('');
                setFormula('');
            }

            return;
        }

        //can't have two decimal places
        if (display.includes(".") && button === ".") {
            return;
        }


        if (display === "0") {
            setDisplay(button);
            setFormula(button);
        }
        else {
            setDisplay(display.concat(button));
            setFormula(formula.concat(button));
        }
    }

    return (
        <div id="calc" className='flex flex-col self-center w-80 h-96 border-4 border-black'>
            <div id="formula" className="h-7 bg-black text-right text-orange-400 px-[1px]">
                {formula}
            </div>
            <div id="display" className="h-16 bg-black text-right text-white text-xl pt-5 px-[1px]">
                {display}
            </div>
            <div id="grid" className='bg-black h-full grid grid-cols-4 gap-[1px] p-[1px]' >
                {buttons.map(item =>
                (
                    <CalcButton id={item.id} text={item.label} key={item.id + "-key"} onClick={HandleClick} />
                ))}
            </div>
        </div>
    )
}