import './App.css';
import RexAppBar from './components/NavBar';
import Container from '@mui/material/Container';
function App() {
  return (
    <div className="App">
      <RexAppBar />
      <Container
        style={{
          minWidth: "100%",
          height: "1000vh",
          backgroundColor: '#ebebeb'
        }}
      >
      </Container>
    </div>
  );
}

export default App;
