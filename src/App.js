import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import Game1 from "./routes/Game1";
import Game2 from "./routes/Game2";
import Game3 from "./routes/Game3";
import Game4 from "./routes/Game4";
import Button from "react-bootstrap/Button";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Content />} />
        <Route
          path="/game"
          element={
            <div className ='web'>
            <div className="webView">
              <header>
                {/* <h2>C o m p r e h e n s i v e&nbsp;&nbsp; G a m e 🎮</h2> */}
              </header>
              <div className="main">
                <div className="main_content">
                  <Nav variant="tabs" className="nav-justified">
                    <Nav.Item>
                      <Nav.Link as = {Link} to = "/game" eventKey="link0">
                        지뢰찾기
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as = {Link} to = "2" eventKey="link1">
                        오목(2인용)
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as = {Link} to = "3" eventKey="link2">
                        스네이크
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link as = {Link} to = "4" eventKey="link3">
                        오셀로(2인용)
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <div className="tab_content">
                    <Outlet/>
                  </div>
                </div>
              </div>
              <footer>
                {/* <h1>🕹️</h1> */}
                <div>
                  {/* <h1> 🔴 🟡 🔵</h1> */}
                  {/* <h1>🔴 🟡 🔵</h1> */}
                </div>
              </footer>
            </div>
            </div>

          }
        >
          <Route path="/game" element={<Game1 />}/>
          <Route path="2" element={<Game2 />}/>
          <Route path="3" element={<Game3 />}/>
          <Route path="4" element={<Game4/>}/>
        </Route>
      </Routes>
    </div>
  );
}

function Content() {
  let navigate = useNavigate();

  return (
    <div className="start">
      <h2>종합 게임 즐기기</h2>
      <Button
        variant="primary"
        className="start"
        onClick={() => {
          navigate("/game");
        }}
      >
        시작하기
      </Button>
    </div>
  );
}

export default App;
