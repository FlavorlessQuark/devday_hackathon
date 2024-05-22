import Home from './views/Home';
import NavBar from './views/Navbar';

import {styled} from 'styled-components'

const App = () => {


  return (
    <>
    <NavBar/>
    <Container>
        <Home/>
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
