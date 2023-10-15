import { useState } from "react";
import { Button } from "react-bootstrap";

// 스네이크
function Game3() {
  var row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let [alert, setAlert] = useState(false);
  var [count, setCount] = useState(60);

  setInterval(function(){
    count -= 1;
    if (count >= 0){
      setCount(count)
    }
  }, 1000);

  return (
    <div>
      <p>
        {alert ? (
          <div>💡 점수 : 0 점 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⏲ 시간 : {count} 초</div>
        ) : (
          <Button
            variant="primary"
            onClick={() => {
              setAlert(true);
            }}
          >
            시작
          </Button>
        )}
      </p>
      <table className="tb3">
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

export default Game3;
