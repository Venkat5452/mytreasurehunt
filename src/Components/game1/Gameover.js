import { useEffect, useState } from "react";
import { UserAuth } from "../../Context/UserAuthContext";
import { Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { datadb } from "../../Firebase";

const Gameover=({setem,attempt,score,setgameOver,setattempt,setscore})=>{ 
  const navigate=useNavigate();
  const score1=0;
  const {user,logOut } = UserAuth();
  const [data,setdata]=useState([{
    name:'',
    score,
    score1
  }]);
  const [tempname,settempname]=useState(user.email);
  const submit=()=>{
    console.log("Called");
    console.log(tempname);
    var name=tempname.split('@').join("");
    name=name.split('.').join("");
    var f=0;
    console.log(name);
    console.log(data);
    for(var i=0;i<data.length;i++) {
      if(data[i].name===user.email) {
        console.log("Here " + data[i]);
        f=1;
        if(data[i].score > attempt) {
          const k=data[i].score1;
          datadb.ref(`Scores/${name}`).set({
            name:user.email,
            score:attempt,
            score1:k
           })
        }
        break;
      }
    }
    if(f===0){
     datadb.ref(`Scores/${name}`).set({
      name:user.email,
      score:attempt,
      score1:0
     })
    }
  }
  useEffect(()=>{
       datadb.ref().child("Scores").on('value',data =>{
        if(data.val()) {
        const getData=Object.values(data.val());
        setdata(getData);
        }
       })
  },[])
  const handleLogout = async () => {
    submit();
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
    const handleClick=()=>{
      submit();
      setgameOver(false);
      setattempt(0);
      setscore(0);
    };
    const handleClick2=()=>{
      submit();
      navigate("/Board");
    }
  return (
    <>
    <div className='game-over text-center mx-auto'>
        <div className='box text-center mx-auto gap-2'>
        <div className='ties p-3'> <h3 className="text-success">Game Over after {attempt} attempts</h3></div>
        {attempt>=8 && (<div>
          <h3 className="text-danger">Ohh no you couldnt make it to next level.. Try Again<span> &#128078;</span></h3>
          </div>)}
        <div className="p-2"><Button onClick={handleClick}>Play Again</Button></div>
        {attempt<8 && (<div>
          <h3 className="text-success"><span>&#127882;</span><span>&#127881;</span>Hey You did it..<span>&#127881;</span><span>&#127882;</span></h3>
          <Button onClick={handleClick2} className="success">Play Next Level</Button></div>)}
        {/* {attempt>=8 && (<div>
          <h3 className="text-danger">Ohh no you couldnt make it to next level.. Try Again<span> &#128078;</span></h3>
          </div>)} */}
        <div className="d-grid mt-3 p-1">
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
      </div>  
        </div>
    </div>
    </>
  )
}

export default Gameover;