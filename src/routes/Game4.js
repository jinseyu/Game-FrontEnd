import { useEffect, useState } from "react";

// 오셀로
function Game4() {
  let [start, setStart] = useState(true);

  var row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  useEffect(() => {
    let a = setTimeout(() => {
      setStart(false);
    }, 3000);
    return () => {
      clearTimeout(a);
    };
  }, []);

  return (
    <div>
      {start == true ? <p>* 흑돌 먼저 시작 !</p> : <p>⚫ : 0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⚪ : 0</p>}
      <table className="tb4">
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

export default Game4;
