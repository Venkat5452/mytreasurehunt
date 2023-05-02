import Game from './Components/game1/game';
import Card from './card';
import Signup from './Components/Signup1';
import Login from './Components/Login';
import Protected from './Components/ProtectedRoute';
import { AuthContextProvider } from './Context/UserAuthContext';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Admin from './Components/Admin';
import Board from './Components/board/Board';
import TestGame from './Components/test/TestGame';
import Home from './Components/Home';
import { Container,Row,Col } from 'react-bootstrap';


function App() {
  return (
    <Container>
      <Row>
      <Col>
    <div className="App p-1 text-center" id='p1'>
      <AuthContextProvider>
      <header className="text-center m-3">
        <h1 style={{fontSize:"60px"}}>Welcome Puzzle Solvers </h1>
      </header>
      {/* <Game/> */}
      <div>
      </div>
      <Routes>
      <Route path='/game' element={<Protected><Game/></Protected>}/>
      <Route path="/card" element={<Card/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/TestGame" element={<TestGame/>}/>
      <Route path="/Board" element={<Protected><Board/></Protected>}/>
      <Route path='/admin' element={<Protected><Admin/></Protected>}/>
      </Routes>
      </AuthContextProvider>
    </div>
    </Col>
    </Row>
    </Container>
  );
}

export default App;
