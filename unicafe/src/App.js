import { useState } from 'react'

const StatisticLine = ({text, value, sign}) => 
<tbody>
  <tr>
    <td>{text}</td>
    <td>{value}{sign}</td>
  </tr>
</tbody>

const Statistics = (props) => {
  const {good, neutral, bad} = props; 
  if(good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table styles={{width:"100%"}}>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={good + neutral + bad}/>
      <StatisticLine text="average" value={(good * 1 + neutral * 0 + bad * -1)/(good + neutral + bad)}/>
      <StatisticLine text="positive" value={(good/(good + neutral + bad)) * 100} sign="%"/>
    </table>
  )
  
}

const Button = (props) => {
  const {onClick, text} = props; 
  return <button onClick={onClick}>{text}</button> 
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const saveFeedback = (review) => () => {
    if(review === "good") {
       return setGood(good + 1); 
    }
    else if(review === "neutral") {
      return setNeutral(neutral + 1); 
    }
    else if(review === "bad") {
      return setBad(bad + 1); 
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {saveFeedback("good")} text="good"/>
      <Button onClick = {saveFeedback("neutral")} text="neutral"/>
      <Button onClick = {saveFeedback("bad")} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  )
}

export default App