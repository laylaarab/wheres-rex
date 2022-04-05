import './App.css';
import RexAppBar from './components/NavBar';
import Container from '@mui/material/Container';
// import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {

    // const [response, setResponse] = useState("");
  
    // useEffect(() => {
    //   const socket = socketIOClient(ENDPOINT);
    //   socket.on("FromAPI", data => {
    //     setResponse(data);
    //   });
    // }, []);
  

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
        Pepe
        {/* {response} */}
      </Container>
    </div>
  );
}

export default App;
