import Home from './views/Home';
import NavBar from './views/Navbar';

import {styled} from 'styled-components'

import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Rate from './views/Rate';


const App = () => {


  return (
    <>
    <NavBar/>
    <Container>
        <Router>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/rate" element={<Rate/>}/>
            </Routes>
        </Router>
    </Container>
    </>
  );
}

const Container = styled.div`
    display:flex;
    padding-top:60px;
    height: calc(100vh - 60px);
`

export default App;
