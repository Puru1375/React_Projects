import { useCallback, useEffect, useRef, useState } from "react"



function App(){

    const [length,setlength] = useState(8)
    const [numberallow,setnumberallow] = useState(false)
    const [charallow,setcharallow] = useState(false)
    const [password,setpassword] = useState("")

    const passwordref = useRef(null)

    const passwordgenerator = useCallback(()=>{
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        
        if (numberallow) str += "01234567890123456789"
        if (charallow) str += "!@#$%^&*?"

        for (let i = 1; i <length; i++) {
            let char = Math.floor(Math.random()*str.length + 1)
            pass += str.charAt(char)
        }

        setpassword(pass)

    },[length,numberallow,charallow,setpassword])

    const copypasswordtoclipboard = useCallback(()=>{
        passwordref.current?.select()
        window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(()=>{
        passwordgenerator()
    },[length,numberallow,charallow,setpassword,passwordgenerator])

    return(

        <div className=" w-full max-w-md mx-auto shadow-md 
        rounded-lg px-4 py-3 my-8 text-black bg-gray-600 
        ">
            <h1 className="text-white text-center">Password generator</h1>
            <div className="flex shadow rounded-lg overflow-hidden py-2
            ">
                <input type="text" 
                value={password}
                className="outline-none w-full py-1.5 px-2 bg-white rounded-l-2xl"
                placeholder="Password"
                readOnly
                ref={passwordref}
                />
                ,<button className="outline-none bg-blue-600
                text-white px-3 py-0.5 shrink-0 rounded-e-2xl"
                onClick={copypasswordtoclipboard}
                >copy</button>
            </div>
            <div className="flex flex-wrap text-sm gap-7  text-white ">
                <div className="flex items-center gap-x-1">
                    <input type="range"
                    min={8}
                    max={100}
                    value={length}
                    className="cursor-pointer"
                    onChange={(e)=>{setlength(e.target.value)}}
                    />
                    <label>Length:{length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input 
                    type="checkbox"
                    defaultChecked={numberallow}
                    id="numberinput"
                    onChange={()=>{
                        setnumberallow((prev)=> !prev)
                    }}
                    />
                    <label>Number</label>
                </div>
                <div className="flex items-center gap-x-1">
                <input 
                    type="checkbox"
                    defaultChecked={charallow}
                    id="charinput"
                    onChange={()=>{
                        setcharallow((prev)=> !prev)
                    }}
                    />
                    <label>Char</label>
                </div>
            </div>
        </div>
    )
}

export default App