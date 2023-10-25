import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import { useState } from "react";
import Game1 from "./routes/Game1";
import Game2 from "./routes/Game2";
import Game3 from "./routes/Game3";
import Game4 from "./routes/Game4";
import Button from "react-bootstrap/Button";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  let [tab, setTab] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Content />} />
        <Route
          path="/game"
          element={
            <div className="webView">
              <header>
                <h2>종합 게임</h2>
              </header>
              <div className="main">
                <div className="main_content">
                  <Nav variant="tabs" className="nav-justified">
                    <Nav.Item>
                      <Nav.Link onClick={() => setTab(0)} eventKey="link0">
                        지뢰찾기
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={() => setTab(1)} eventKey="link1">
                        오목(2인용)
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={() => setTab(2)} eventKey="link2">
                        스네이크
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={() => setTab(3)} eventKey="link3">
                        오셀로(2인용)
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <div className="tab_content">
                    <TabContent tab={tab} />
                  </div>
                </div>
              </div>
              <footer>
                <h2>footer</h2>
              </footer>
            </div>
          }
        >
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


function TabContent(props) {
  return <>{[<Game1 />, <Game2 />, <Game3 />, <Game4 />][props.tab]}</>;
}

export default App;
