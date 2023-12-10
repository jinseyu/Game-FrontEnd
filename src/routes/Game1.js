import axios from "axios";
import { useEffect, useState } from "react";

// 지뢰찾기
function Game1() {
  let [col,setCol] = useState(Array.from({length:13},()=>Array.from({length:13},()=>-1)))
  let [count, setCount] = useState(60);
  let [color, setColor] = useState('');
  let [clickedCell, setClickedCell] = useState(new Set());
  // console.log(col)
  const handleCellClick = (i, j) => {
    const newColor = color === '' ? 'white_line' : color;
    setColor(newColor);

    // 클릭한 셀의 좌표를 Set에 추가
    const newClickedCell = new Set(clickedCell);
    newClickedCell.add(`${i}-${j}`);
    setClickedCell(newClickedCell);

    // 눌려있는데 숫자 없으면 0, 안눌려있으면 -1(지뢰 상관없이)
    const encodeGameBoard = () => {
          console.log()
          return col
            .map((a,i)=>{
              return a.map((b,j)=>{
                return newClickedCell.has(`${i}-${j}`) ? '0' : '-1'
              }).join("")
            }).join("/")
        }
      

    axios
    .post("https://jsonplaceholder.typicode.com/posts", {
      // location: (13 - i) + "," + (j-1),
      location: (i) + "," + (j),
      situation : encodeGameBoard(),
    })
    .then((res) => {
      setCol(res.data.situation.split("/").reverse().map(e=>e.split("")))
      console.log(res.data);
    })
    .catch((err) => {
      console.log("실패");
    }); 
  }

  // useEffect(() => {
  //   let a = setInterval(function () {
  //     count -= 1;
  //     if (count >= 0) {
  //       setCount(count);
  //     }
  //   }, 1000);
  
  //   return () => {
  //     clearTimeout(a);
  //   };
  // }, []);

  return (
    <div>
      <p>⏲ 남은 시간 : {count} 초</p>

      <table className="tb1">
        <tbody>
        {col.map((_,i) => {
            return (
              <tr>
                {col.map((_,j) => {
                  return (
                    <td
                      // 클릭한 칸이 흑 -> 백으로 바뀌게
                      id={`cell-${i}-${j}`}
                      className={clickedCell.has(`${12-i}-${j}`)? color : ''}
                      onClick={() => {handleCellClick(12-i, j)}} 
                    >
                  {/* 흰색 칸 안에 숫자 1 표시  */}
                  {clickedCell.has(`${12-i}-${j}`) && color === 'white_line' && (
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

