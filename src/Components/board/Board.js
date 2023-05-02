import { useEffect, useState } from "react"
import './Board.css'
import Tile from "../tile/Tile"
import Overlay from "../overlay/Overlay"
import NewGame from "../new-game/NewGame"
import Winner from "../winner/Winner"
import { UserAuth } from "../../Context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"

const Board = () => {

    const {user,logOut} = UserAuth();
    const [name1,setname1]=useState(user.email);
    const navigate= useNavigate();
    const [m,setm]=useState(0);
    const [s,sets]=useState(0)
    const [flag,setflag]=useState(true);
    const handleLogout = async () => {
        try {
          await logOut();
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
      };
      var timer;
      useEffect(()=>{
          timer = setInterval(()=>{
            if(flag===true) {
                  sets(s+1);
                  if(s===59) {
                    setm(m+1);
                    sets(0);
                  }
                }
          },1000)
          return ()=>clearInterval(timer);
      })
    const shuffle = () =>  
        new Array(16)
        .fill()
        .map((_,i) => i+1)
        .sort(() => Math.random() -.5)
        .map((x,i) => ({value : x , index : i}))

    const [numbers,setNumbers] = useState([])
    const [animating,setAnimating] = useState(false)

    const reset = () =>{
        setm(0);
        sets(0);
        setflag(true);
        setNumbers(shuffle());
    }

    const moveTile = tile => {
        const i16 = numbers.find(n => n.value===16).index
        if (![i16-1,i16+1,i16-4,i16+4].includes(tile.index) || animating)
            return
        
        const newNumbers = 
            [...numbers]
            .map(number => {
                if (number.index !== i16 && number.index !== tile.index)
                    return number
                else if (number.value === 16)
                    return {value: 16, index: tile.index}

                return {value: tile.value, index : i16}
            })
        setAnimating(true)
        setNumbers(newNumbers)
        setTimeout(() => setAnimating(false), 200)
    }
    
    const handleKeyDown = e => {
        const i16 = numbers.find(n => n.value===16).index
        if (e.keyCode === 37 && !(i16 % 4 === 3))
            moveTile(numbers.find(n => n.index === i16 + 1))
        else if (e.keyCode === 38 && !(i16 > 11))
            moveTile(numbers.find(n => n.index === i16 + 4))
        else if (e.keyCode === 39 && !(i16 % 4 === 0))
            moveTile(numbers.find(n => n.index === i16 - 1))
        else if (e.keyCode === 40 && !(i16 < 4))
            moveTile(numbers.find(n => n.index === i16 - 4))
    }

    useEffect(() => {
        document.addEventListener('keydown',handleKeyDown)
        return () => {document.removeEventListener('keydown',handleKeyDown)}
    })

    useEffect(reset, [])

    return <div className="container fluid"><div style={{marginTop:"-50px"}} className="game p-5 ">
        <h3> &#129351; Solve This To get Treasure &#129351;</h3>
        <h3>&#8986; Timer = {m} : {s} &#8986;</h3>
        <div className="board">
            <Overlay size={16} />
            {numbers.map ((x,i) => {
                return <Tile key={i} number={x} moveTile={moveTile}/>
            })}
        </div>
        <Winner numbers={numbers} reset={reset} m={m} s={s} setflag={setflag}/>
        <NewGame reset={reset} />
        <div className="d-grid mt-2 p-1">
          <Button variant="" style={{background:"rgb(238, 9, 121)"}} onClick={handleLogout}>
            Log out
          </Button>
      </div>  
    </div>
    </div>
}

export default Board