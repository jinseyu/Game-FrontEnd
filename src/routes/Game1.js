import { useEffect, useState } from "react";

// 지뢰찾기
function Game1() {
  let col = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let [count, setCount] = useState(60);
  let [color, setColor] = useState('');
  let [clickedCell, setClickedCell] = useState([]); // 클릭한 칸의 좌표

  const handleCellClick = (i, j) => {
    setClickedCell([...clickedCell, {i,j}]);
    setColor('white_line');
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
                      className={clickedCell.some((e) => e.i === i && e.j === j) ? color : ''}
                      onClick={() => {handleCellClick(i, j)}} 
                    ></td>
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