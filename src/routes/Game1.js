import { useState } from "react";

// 지뢰찾기
function Game1() {
  var row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  var [count, setCount] = useState(60);

  setInterval(function(){
    count -= 1;
    if (count >= 0){
      setCount(count)
    }
  }, 1000);

  return (
    <div>
      <p>⏲ 남은 시간 : {count} 초</p>

      <table className="tb1" onClick={() => {
      }}>
        <tbody>
          {row.map(function () {
            return (
              <tr>
                {row.map(function (a, i) {
                  return <td onClick={() => console.log(i)}></td>;
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
