import { useEffect, useState } from "react";

// 오목
function Game2() {
  let [start, setStart] = useState(true);
  let [clickedCells, setClickedCells] = useState([]); // 클릭된 셀의 위치를 배열로 저장
  let [color, setColor] = useState(''); // 현재 돌의 색상

  var row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  useEffect(() => {
    let a = setTimeout(() => {
      setStart(false);
    }, 3000);
    return () => {
      clearTimeout(a);
    };
  }, []);

  const handleCellClick = (i, j) => {
    // 클릭된 셀의 위치를 배열에 추가
    setClickedCells([...clickedCells, { i, j }]);
    
    // 현재 클릭된 셀의 돌 색을 저장
    const newColor = color === 'black' ? 'white' : 'black';

    // 현재 클릭된 셀의 돌 색을 변경
    document.getElementById(`cell-${i}-${j}`).style.backgroundColor = newColor;

    // 현재 클릭된 돌의 색상을 변경
    setColor(newColor);
  };

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
                        className={clickedCells.some(cell => cell.i === i && cell.j === j) ? color : ''}
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
