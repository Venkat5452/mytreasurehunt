import NewGame from '../new-game/NewGame'
import './Winner.css'
import { datadb } from "../../Firebase";
import { useState,useEffect } from 'react';
import { UserAuth } from '../../Context/UserAuthContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Winner = ({numbers,reset,m,s,setflag}) => {
    // if (!numbers.every(n => n.value === n.index +1)) {
    //     setflag(true)    
    //     return null
    // }
    const {user,logOut } = UserAuth();
    const navigate=useNavigate();
    var score,score1;
    const [f,sf]=useState(true);
    const [data,setdata]=useState([{
        name:'',
        score,
        score1
      }]);
      useEffect(()=>{
        datadb.ref().child("Scores").on('value',data =>{
         if(data.val()) {
         const getData=Object.values(data.val());
         console.log(getData);
         setdata(getData);
         }
        })
   },[])
    if (!numbers.every(n => n.value === n.index +1)) {
        setflag(true)    
        return null
    }
    setflag(false);
    const seconds=s,minutes=m;
    const credits=()=>{
        sf(false);
        const temp=(m*60 + s);
        console.log(user.email);
        console.log("Called");
        var name=user.email;
        name=name.split('@').join("");
        name=name.split('.').join("");
        console.log(name);
        console.log(data);
        for(var i=0;i<data.length;i++) {
           if(data[i].name===user.email) {
           console.log("Here " + data[i]);
           if(data[i].score1 > temp || data[i].score1===0) {
              const k=data[i].score;
              datadb.ref(`Scores/${name}`).set({
                name:user.email,
                score:k,
                score1:temp
           })
          }
         break;
       }
      }
    }
    const handleLogout = async () => {
        credits();
        try {
          await logOut();
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
      };
    return <div
        className="winner">
        <p>You win! ,Time Taken = {minutes} : {seconds}</p>
        {f &&  <Button variant="" style={{background:"rgb(238, 9, 121)"}} onClick={credits}>Get Credits</Button>}
        {!f && (<div>
          <h3 className="text-success"><span>&#127882;</span><span>&#127881;</span>You Won {minutes*60 + seconds} points<span>&#127881;</span><span>&#127882;</span></h3></div>)}
        <NewGame reset={reset} />
        <div className="d-grid mt-3 p-1">
          <Button variant="" style={{background:"rgb(238, 9, 121)"}} onClick={handleLogout}>
            Log out
          </Button>
        </div>  
    </div>
}

export default Winner