import { useEffect, useState } from "react";
import axios from "axios";

// 오목
function Game2() {
  let [start, setStart] = useState(true);
  let [clickedCells, setClickedCells] = useState([]); // 클릭된 셀의 위치
  let [color, setColor] = useState(""); // 현재 돌의 색상

  var row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const handleCellClick = (i, j) => {
    // 클릭된 셀의 위치를 {{i:1, j:2}, {i:2,j:1}...} 형식으로 누적되 저장
    setClickedCells([...clickedCells, { i, j }]);

    // 현재 클릭된 셀의 돌 색을 저장
    const newColor = color === "black" ? "white" : "black"; // 다음에 나올 돌 색

    // 현재 클릭된 셀의 돌 색을 변경
    document.getElementById(`cell-${i}-${j}`).style.backgroundColor = newColor;

    // 현재 클릭된 돌의 색상을 변경
    setColor(newColor);

    // 게임 상황
    const encodeGameBoard = () => {
      const encodedSituation = 
        row.map((i) => {
            return row.map((j) => {
                const cellValue = clickedCells.some((cell) => cell.i === i && cell.j === j)
                      ? color === "black" ? "1" : "2" : "0";
                return cellValue;
              })
              .join("");})
            .join("/");

      return encodedSituation;
    };

    const situationData = encodeGameBoard();

    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        // 임시 서버
        color: newColor === "black" ? "1" : "2", // 1이면 흑, 2이면 백
        // location : { x : 14 - i, y : j}, // 왼쪽 아래 (1,1) 기준 좌표
        location: 14 - i + "," + j,
        // (13,1) => (1,1) , (13,2) => (1,2)
        // (12,1) => (2,1) , (12,2) => (2,2)
        situation: situationData, // 게임 상황
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
            {row.map(function (i) {
              return (
                <tr key={i}>
                  {row.map(function (j) {
                    return (
                      <td
                        id={`cell-${i}-${j}`}
                        // some 은 객체 내 원하는 값이 있는지 확인
                        className={
                          clickedCells.some((cell) => cell.i === i && cell.j === j) ? color : ""}
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
