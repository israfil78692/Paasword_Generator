import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(5)
  const [NumberAllowed,setNumberAllowed]=useState(true)
  const [CharAllowed,setCharAllowed]=useState(false)
  const [Password,setPassword]=useState("")
  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=''
    let str='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if(NumberAllowed) str+="1234567890"
    if(CharAllowed) str+="!@#$%^&*()_+"
    for (let i = 0; i < length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
      
    }
    setPassword(pass)
  },[length,CharAllowed,NumberAllowed])


  const copyToClickboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,4)
    window.navigator.clipboard.writeText(Password)
  },[Password])


  useEffect(()=>{
    passwordGenerator()
  },[length,CharAllowed,NumberAllowed])

  return (
    
    <div className='w-full max-w-sm mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500 '>
      <h1 className='text-center text-white my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input className='outline-none w-full py-1 px-3'
         type="text" 
         placeholder='Password'
         value={Password}
         ref={passwordRef}
          readOnly />
        <button 
        onClick={copyToClickboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div >

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
           <input type="range"
           min={6}
           max={100}
           value={length}
           onChange={(e)=>{setlength(e.target.value)}}
           className='cursor-pointer' />
           <label htmlFor="length">Lenght:({length})</label>
        </div>
      <div className="flex items-center gap-x-1">
      <input type="checkbox"
           defaultChecked={NumberAllowed}
           id='numberInput'
           onChange={()=>{
            setNumberAllowed((prev)=>!prev)
           }
           }
       />
      <label htmlFor="number input">Number Allowed</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input type="checkbox"
         defaultChecked={CharAllowed}
          id='char Input'
          onChange={()=>{
       setCharAllowed((prev)=>!prev) 
      }}
      />
      <label htmlFor="character input">Character Allowed</label>
      </div>
      </div>
    </div>
    
  )
}

export default App
