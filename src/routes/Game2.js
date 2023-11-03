import { useEffect, useState } from "react";
import axios from "axios";

// 오목
function Game2() {
  let [start, setStart] = useState(true);
  var [clickedCell, setClickedCell] = useState([]); // 클릭한 칸의 좌표
  let [color, setColor] = useState(""); // 현재 돌의 색상

  var col = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const handleCellClick = (i, j) => {
    // 클릭된 셀의 위치를 {{i:1, j:2}, {i:2,j:1}...} 형식으로 누적되 저장
    setClickedCell([...clickedCell, { i, j }]);

    // 현재 클릭된 셀의 돌 색을 저장
    const newColor = color === "black" ? "white" : "black"; // 다음에 나올 돌 색

    // 현재 클릭된 셀의 돌 색을 변경
    document.getElementById(`cell-${i}-${j}`).style.background = newColor;

    // 현재 클릭된 돌의 색상을 변경
    setColor(newColor);

    // 게임 상황
    const encodeGameBoard = () => {
      return col
        .map((i) => {
          return col
            .map((j) => {
              {
                if (
                  document.getElementById(`cell-${i}-${j}`).style.background == "black"
                ) {
                  return "1";
                } else if (
                  document.getElementById(`cell-${i}-${j}`).style.background == "white"
                ) { 
                  return "2";
                } else {
                  return "0";
                }
              }
            })
            .join("");
        })
        .join("/");
    };

    axios.post("https://jsonplaceholder.typicode.com/posts", { // 임시 서버
        color: newColor === "black" ? "1" : "2", // 1이면 흑, 2이면 백
        // 왼쪽 위 (0,0) 기준
        location : (i -1) + "," + (j-1),
        situation: encodeGameBoard(), // 게임 상황
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("실패");
      });
  };

  useEffect(() => {
    let a = setTimeout(() => {
      setStart(false);
    }, 3000);
    return () => {
      clearTimeout(a);
    };
  }, []);

  return (
    <>
      <div>
        {start === true ? <p>* 흑돌 먼저 시작 !</p> : <p>&nbsp;</p>}
        <table className="tb2">
          <tbody>
            {col.map(function (i) {
              return (
                <tr key={i}>
                  {col.map(function (j) {
                    return (
                      <td key={`${i}-${j}`} 
                        id={`cell-${i}-${j}`}
                        // some 은 객체 내 원하는 값이 있는지 확인
                        className={
                          clickedCell.some((cell) => cell.i === i && cell.j === j) ? color : ""}
                        onClick={() => handleCellClick(i, j)}
                      ></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Game2;
