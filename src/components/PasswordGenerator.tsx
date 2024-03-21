import { useState, useEffect } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);

  const generatePassword = () => {
    let pasword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (symbol) {
      str += "!@#$%^&*()_+/";
    }
    if (number) {
      str += "0123456789";
    }
    for (let i = 0; i < length; i++) {
      let indexOfChar = Math.floor(Math.random() * str.length + 1);
      pasword += str.charAt(indexOfChar);
    }
    setPassword(pasword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, number, symbol]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      alert("Text copied to clipboard:" + password);
    } catch (error) {
      alert("Error copying to clipboard:" + error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center content-center">
        <h1 className="font-bold text-lg text-red-800 p-20">
          Password Generator
        </h1>

        <div className="p-2">
          <input
            type="text"
            placeholder="Password"
            className="p-1"
            value={password}
            readOnly
          />
          <button
            className="bg-red-800 p-1 pl-2 pr-2 ml-3 text-white border-2 cursor-pointer"
            onClick={copyToClipboard}
          >
            Copy{" "}
          </button>
        </div>
        <div className="flex w-96 mt-8 items-center justify-between">
          <div className="flex items-center">
            <input
              type="range"
              min="5"
              max="15"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>:Length</label>
          </div>
          <div className="">
            <input
              type="checkbox"
              checked={number}
              onChange={() => setNumber((prev) => !prev)}
            />
            <label>:Number</label>
          </div>
          <div className="">
            <input
              type="checkbox"
              checked={symbol}
              onChange={() => setSymbol((prev) => !prev)}
            />
            <label>:Symbol</label>
          </div>
        </div>
      </div>
    </>
  );
}
