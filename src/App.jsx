/* eslint-disable no-unused-vars */
import './App.css';
import React, {useState, useEffect} from "react"
import RequestQuizzData from "./components/RequestQuizzData"
import QuizzQuestions from "./components/QuizzQuestions"
import ChargingAnimation from "./components/ChargingAnimation"
import Error from "./components/Error"
import { shuffleArray } from "./components/shuffleArray"

function App() {
  
  const [quizzCategories, setQuizzCategories] = useState([]);
  const [queryParameters, setQueryParameters] = useState({
    amount: 0,
    category: ``,
    difficulty: ``,
    type: ``,
    state: 0 //state 0 initial, state 1 getting quizz categories
             //state 2 questions quizz selecteds, state 3 displaying questions
             //state 4 questions completed, state 5 error
});
  const [quizzQuestions, setQuizzQuestions] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then(data => {
          setQuizzCategories(data.trivia_categories)
          handleState(1)
          console.log(data)
      })
      .catch(error => handleState(5))
}, [])

useEffect(() => {
  if(queryParameters.state === 2) {
    const {amount, category, difficulty, type} = queryParameters
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&encode=url3986`)
    .then(res => res.json())
    .then(({response_code, results}) => {
         if (response_code === 0) {
                let questionsPrep = []
                results.forEach(result => {
                    const correctAnswer = decodeURIComponent(result.correct_answer)
                    questionsPrep.push({
                            question: decodeURIComponent(result.question),
                            answers: queryParameters.type === `multiple`
                    ? shuffleArray([...result.incorrect_answers.map(answer => decodeURIComponent(answer)), correctAnswer])
                    : [`True`, `False`],
                            correctAnswer: correctAnswer
                })
            })
            setQuizzQuestions(questionsPrep)
            handleState(3)
        }
        else throw Error
    })
    .catch(error =>handleState(5))
  }
}, [queryParameters])

function handleState(value){
  setQueryParameters(prev => (value === 1 ?
   {amount: 5, category: ``, difficulty: ``, type: ``, state: 1} 
   : {...prev, state: value}))
}

function changeValues(event){
  const {value, name} = event.target
  setQueryParameters(prev => ({...prev, [name]: value}))
}

  return (
    <div className="app-container">
      <div className="bg-container">
            <div className="area" >
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
      </div>
      <div className="components-container">
             <div className="center-div">
                {queryParameters.state === 1 && 
                <RequestQuizzData 
                    amount={queryParameters.amount}
                    category={queryParameters.category}
                    difficulty={queryParameters.difficulty}
                    type={queryParameters.type}
                    categories={quizzCategories}
                    handleState={() => handleState(2)}
                    changeValues={changeValues}
                />}
                {(queryParameters.state === 3 || queryParameters.state === 4) && 
                <QuizzQuestions
                    questions={quizzQuestions}
                    state={queryParameters.state}
                    handleReset={() => handleState(1)}
                    completedState={() => handleState(4)}
                />}
                {queryParameters.state === 5 && 
                <Error 
                    handleReset={() => handleState(1)}
                />}
                {(queryParameters.state === 2 || queryParameters.state === 0) && <ChargingAnimation />}
             </div>
            </div>
    </div>
  );
}

export default App
