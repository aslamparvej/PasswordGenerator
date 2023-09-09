import React, { useCallback, useEffect, useState,useRef } from "react";
import "./PasswordGenerator.css";

const PasswordGenerator = () => {
    // Use State 
    const [password, setPassword] = useState();
    const [passwordLength, setPasswordLength] = useState(8);
    const [numbers, setNumbers] = useState(false);
    const [spcChar, setSpcChar] = useState(false);

    const passwordRef  = useRef(null);

    const passwordGenerator = useCallback(()=>{
        let pass = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' 

        if(numbers) str+='0123456789';
        if(spcChar) str+='~!@#$%^&*(){}[]?/.,<>';

        for(let i=1; i<= passwordLength; i++){
            let charIndex = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(charIndex);
        }

        setPassword(pass);
    },[passwordLength,numbers,spcChar])


    const copyPasswordToCLipBoard = useCallback(()=>{
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    },[password])


    useEffect(()=>{
        passwordGenerator();
    }, [numbers,spcChar,passwordLength])

  return (
    <div className="passwordGenerator-container">
      <div className="passwordGenerator-content">
        <div className="passwordGenerator-header">
          <h1>Password Generator</h1>
        </div>
        <div className="passwordGenerator-content-top">
          <input
            className="custom-form-control"
            id="passwordInputField"
            name="passwordInputField"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button className="custom-btn" type="button" onClick={copyPasswordToCLipBoard}>Copy</button>
        </div>
        <div className="generate-btn-container">
          <button className="custom-btn custom-btn-create" type="button" onClick={passwordGenerator}><i class="fa-solid fa-rotate fa-xl"></i></button>
        </div>
        <div className="passwordGenerator-content-bottom">
          <div className="input-container input-container-sm">
            <input
              type="range"
              className="custom-form-control-range"
              id="passwordRange"
              name="passwordRange"
              min={8}
              max={50}
              value={passwordLength}
              onChange={(e)=>  setPasswordLength(e.target.value)}
            />
            <label htmlFor="passwordRange">Length of Password {passwordLength}</label>
          </div>
          <div className="input-container">
            <input
              type="checkbox"
              className="custom-form-control-check"
              id="numberCheckBox"
              name="numberCheckBox"
              onChange={(e)=>  setNumbers((prev)=> !prev)}
            />
            <label htmlFor="numberCheckBox">Numbers</label>
          </div>
          <div className="input-container">
            <input
              type="checkbox"
              className="custom-form-control-check"
              id="specialCharCheckBox"
              name="specialCharCheckBox"
              onChange={(e)=>  setSpcChar((prev)=> !prev)}
            />
            <label htmlFor="specialCharCheckBox">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
