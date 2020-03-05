import React from "react";

import { useSeconds } from "use-seconds";

const App = () => {
  const [time, eventTime, nextMs] = useSeconds();
  const renderTime = new Date();

  return (
    <div>
      <p>next tick: {nextMs} (ms)</p>
      <table>
        <tbody>
          <tr>
            <th>useSeconds fixedTime</th>
            <td>{String(time.getSeconds())}</td>
            <td>{+time}</td>
            <td>{String(time)}</td>
          </tr>
          <tr>
            <th>useSeconds eventTime</th>
            <td>{String(eventTime.getSeconds())}</td>
            <td>{+eventTime}</td>
            <td>{String(eventTime)}</td>
          </tr>
          <tr>
            <th>render Called</th>
            <td>{String(renderTime.getSeconds())}</td>
            <td>{+renderTime}</td>
            <td>{String(renderTime)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default App;
