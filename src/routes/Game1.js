import axios from "axios";
import { useEffect, useState } from "react";

// 지뢰찾기
function Game1() {
  let col = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let [count, setCount] = useState(60);
  let [color, setColor] = useState('');
  let [clickedCell, setClickedCell] = useState(new Set());

  const handleCellClick = (i, j) => {
    setClickedCell([...clickedCell, {i,j}]);
    const newColor = color === '' ? 'white_line' : color;
    setColor(newColor);

    // 클릭한 셀의 좌표를 Set에 추가
    const newClickedCell = new Set(clickedCell);
    newClickedCell.add(`${i}-${j}`);
    setClickedCell(newClickedCell);

    // 눌려있는데 숫자 없으면 0, 안눌려있으면 -1(지뢰 상관없이)
    const encodeGameBoard = () => {
      return col
        .map((i) => {
          return col
            .map((j) => newClickedCell.has(`${i}-${j}`) ? '0' : '-1')
            .join("");
        })
        .join("/");
    };

    axios
    .post("https://jsonplaceholder.typicode.com/posts", {
      color : newColor === 'white_line' ? '0' : '-1',
      location: (13 - i) + "," + (j-1),
      situation : encodeGameBoard(),
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log("실패");
    }); 
  }

  useEffect(() => {
    let a = setInterval(function () {
      count -= 1;
      if (count >= 0) {
        setCount(count);
      }
    }, 1000);
  
    return () => {
      clearTimeout(a);
    };
  }, []);

  return (
    <div>
      <p>⏲ 남은 시간 : {count} 초</p>

      <table className="tb1">
        <tbody>
        {col.map((i) => {
            return (
              <tr>
                {col.map((j) => {
                  return (
                    <td
                      // 클릭한 칸이 흑 -> 백으로 바뀌게
                      id={`cell-${i}-${j}`}
                      className={clickedCell.has(`${i}-${j}`)? color : ''}
                      onClick={() => {handleCellClick(i, j)}} 
                    >
                        {/* 흰색 칸 안에 숫자 1 표시 */}
                  {clickedCell.has(`${i}-${j}`) && color === 'white_line' && (
                    <div className="number">1</div>
                  )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Game1;