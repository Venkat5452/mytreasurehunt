import React, { useState } from 'react'
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context/UserAuthContext';
import { datadb } from '../Firebase';
import { useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import './Admin.css'
function Admin() {
    const navigate=useNavigate();
    const { logOut }=UserAuth();
    const [data,setdata]=useState([]);
    const [rule,setrule]=useState(false);
    const handleLogout = async () => {
         try {
           await logOut();
           navigate("/");
         } catch (error) {
           console.log(error.message);
         }
       };
       useEffect(()=>{
          datadb.ref(`Scores`).on('value',(k)=>{
            let scoresArray=[]
            k.forEach((x) => {
              let newscore={
                name:x.val().name,
                score:x.val().score,
                score1:x.val().score1
              }
              scoresArray.push(newscore)
            });
            setdata(scoresArray);
          })
       },[])
       function find(x1,y1,x2,y2){
        if(y2===0 && y1===0) {
          return x1-x2;
        }
        if(y2===0) {
          return -1;
        }
        if(y1===0) {
          return 1;
        }
            x1+=y1;
            x2+=y2;
          return x1-x2;
       }
       data.sort((a,b)=>(
          find(a.score,a.score1,b.score,b.score1)
       ));
      const handlerules=()=>{
        if(rule===true) {
          setrule(false);
        }
        else {
         setrule(true);
        }
      }
      function deleteuser(n){
        n=n.split('@').join("");
        n=n.split('.').join("");
        datadb.ref(`Scores/${n}`).remove();
      }
  return (
    <div>
        <div className="d-grid m-3 p-3">
        <h1>DashBoard</h1>
        {/* {!rule && <div className='rules'><p><Link onClick={handlerules}>LeaderBoard rules</Link></p></div>} */}
        {rule && (
          <div className='p-2'>
            <p className='text-danger'><Link onClick={handlerules}>Hide rules</Link></p>
          <ul >
              <li>Minimum Number of attempts taken to match the clues in the Level-1</li>
              <li>Minimum time taken to complete the Level-2.</li>
              <li>Level-1 points given by number of attempts to match the clues.</li>
              <li>Level-2 points given by total number of seconds taken to complete it.</li>
              <li>User Should play atleast one level to be in LeaderBoard</li>
              <li className='text-danger'>Rank is given based on the criteria Minimum(score1+score2)</li>
              <li className='text-danger'>A person Attempted both the levels is prioritized over person who attempted only one level</li>
          </ul>
          </div>
        )
        }
          <div>Soft skills: <h3 className='' style={{color:"rgb(238, 9, 121)"}}>Problem Solving skills and Memory Power</h3></div>
          {!rule && <div className='rules'><p><Link onClick={handlerules}>LeaderBoard rules</Link></p></div>}
          {/* <h5>Leader Board is based on</h5> 
            <ul>Minimum Number of attempts taken to match the clues in the 1st round </ul> 
            <ul>Minimum time taken to complete the 2nd round.</ul> */}        
        <div className="table-responsive">  
        <table class="table table-dark">
        <thead >
          <tr>
            <th scope="col"> <h6>Rank</h6> </th>
            <th scope="col"> <h6>Name(Email)</h6>  </th>
            <th scope="col"><h6>Level-1(Min Attempts)</h6></th>
            <th scope="col"><h6>Level-2(Min Time)</h6></th>
            <th scope="col"><h6> Remove </h6></th>
          </tr>
        </thead>
        <tbody>
         { data.map((x,id)=>{
          return (
          <tr>
            <th scope="row">{id+1}</th>
             <td><h6>{x.name}</h6></td>
             <td><h6>{x.score}</h6></td>
             <td><h6>{x.score1===0 ? "N/A" : x.score1}</h6></td>
             <td><Button className='btn-danger text-center' style={{cursor:"pointer"}} onClick={()=>deleteuser(x.name)} ><MdDelete/></Button></td>
             </tr>
           )
          })}
        </tbody>
        </table>
        </div>
          <Button variant="" style={{background:"rgb(238, 9, 121)"}} onClick={handleLogout}>
            Log out
          </Button>
      </div>  
    </div>
  )
}

export default Admin