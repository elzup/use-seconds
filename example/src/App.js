import React from "react"

import { useSeconds } from "use-seconds"

const App = () => {
  const [time, eventTime, nextMs] = useSeconds()
  const renderTime = new Date()

  return (
    <div>
      <p>next tick: {nextMs} (ms)</p>
      <table>
        <tr>
          <th></th>
          <th>
            <code>+time</code>
          </th>
          <th>
            <code>time.getSeconds()</code>
          </th>
          <th>
            <code>time.toISOString()</code>
          </th>
        </tr>
        <tbody>
          <tr>
            <th>useSeconds fixedTime</th>
            <td>{+time}</td>
            <td>{String(time.getSeconds())}</td>
            <td>{time.toISOString()}</td>
          </tr>
          <tr>
            <th>useSeconds eventTime</th>
            <td>{+eventTime}</td>
            <td>{String(eventTime.getSeconds())}</td>
            <td>{eventTime.toISOString()}</td>
          </tr>
          <tr>
            <th>render Called</th>
            <td>{+renderTime}</td>
            <td>{String(renderTime.getSeconds())}</td>
            <td>{renderTime.toISOString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default App
