import React, { useState ,useEffect} from 'react';
import Card from '../../card';
import Gameover from './Gameover';
import { Button } from 'react-bootstrap';
import { UserAuth } from "../../Context/UserAuthContext";
import { useNavigate } from 'react-router-dom';
import './game1.css'
function Game() {
   let ImagesBox=[
      {
         num:1,
         img:'https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9zZSUyMGZsb3dlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
         isMatch:false
   },
   {
       num:2,
       isMatch:false,
       img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn5VRZFYkjlWV8mvWzl1WOnX0RMg_7EkScAA&usqp=CAU'
   },
   {
      num:3,
      isMatch:false,
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6mSXj2A2zh92CV9tMNKfnvf3iq5ZRIPQr_w&usqp=CAU'
   },
   {
      num:4,
      isMatch:false,
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv84UFTEq6QSm0wD5qncd8BX8N7ODouL7qPQ&usqp=CAU'
   },
   {
      num:5,
      isMatch:false,
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN0vhDMoHS8nWNnQs6xS5CrYfODyv3h-yz8w&usqp=CAU'
   },
   {
      num:6,
      isMatch:false,
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnfbExhE5pgI09sUGFa8qEa-LkQDGKG2Okxw&usqp=CAU'  
   }];
   const [cards , setcards ]= useState([]);
   const [em,setem]=useState("");
   const [cardselected,setselected]=useState([]);
   const [score,setscore]=useState(0);
   const [attempt,setattempt]=useState(0);
   const [gameOver,setgameOver]=useState(false);
    
   const {logOut ,user} = UserAuth();
   const navigate= useNavigate();
   const handleLogout = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    };
   const shuffleImg = ()=>{
      let shuffledArray = [...ImagesBox,...ImagesBox]
      .map((item,ind)=> ({...item,id:ind + 1}))
      .sort((a,b)=> 0.5 - Math.random());
      // setscore(0);
      // setattempt(0);
      setcards(shuffledArray);
   };
   //console.log(cards);
   useEffect((e) => {
     shuffleImg();
   }, []);



   useEffect(()=>{
      setem(user.email);
      if(cardselected.length===2) {
         setTimeout(()=>{
            setselected([]);
         },1000)
         checkMatch();
      }
      //console.log(cardselected);
   },[cardselected]);



   const checkMatch=()=>{
     if(cardselected[0].num === cardselected[1].num) {
       //console.log("Hello");
       setscore((x)=>x+1);
       let updatedcards=cards.map((card)=>{
         if(card.num === cardselected[0].num) {
            return {...card,isMatch:true};
         }
         return card
       });
       setcards(updatedcards);
     } 
     else {
      setattempt((k)=>k+1);
      //console.log("Dont match");
     }
   };



   useEffect(()=>{
      if(score===ImagesBox.length) {
         //console.log("Game Over");
            shuffleImg();
            setgameOver(true);
      }
   },[score]);



  return (
   <>
   {gameOver && <Gameover attempt={attempt} score={score} setgameOver={setgameOver} setattempt={setattempt} setscore={setscore}/>}
    <div className='fluid container text-center p-1' id='p1' >
      <h5>Player : {user.email}</h5>
      <h4 className='' style={{color:"rgb(238, 9, 121)"}}>Match These Clues in 8 attempts To  &#128275; Treasure Puzzle</h4> <h3> &#128073;  Attempts : {attempt} &#128072;</h3>
      <div className='cards-container gap-1 p-1'>
        {cards.map((card)=>(
            <Card setem={setem} key={card.id} card={card} setselected={setselected} cardselected={cardselected}/>
        ))}
      </div>
      <div className="d-grid mt-3 p-1">
          <Button variant="" style={{background:"rgb(238, 9, 121)"}} onClick={handleLogout}>
            Log out
          </Button>
      </div>  
    </div>
    </>
  )
}

export default Game;