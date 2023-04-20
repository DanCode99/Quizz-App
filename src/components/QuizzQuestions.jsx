// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function QuizzQuestions(props) {
    const { questions, state, handleReset, completedState } = props;
    const [checked, setChecked] = useState(() =>
        new Array(questions.length).fill(new Array(questions[0].answers.length).fill(false))
    );
    const [complete, setComplete] = useState(() => false);

    useEffect(() => {
        setComplete(checked.every(answered => answered.includes(true)));
    }, [checked]);

    const questionElements = questions.map(({ question, answers, correctAnswer }, index) => {
        return (
            <section key={index}>
                <h3 className="question">{question}</h3>
                <div className="answers">
                    {answers.map((answer, subIndex) => (
                        <div key={subIndex}>
                            <input
                                id={`${index}-${subIndex}`}
                                type="checkbox"
                                className="answer-checkbox"
                                checked={checked[index][subIndex]}
                                onChange={() => handleChange(index, subIndex)}
                                disabled={complete && state === 4}
                            />
                            <label
                                className={`answer ${
                                    state === 4 && (answer === correctAnswer ? `correct` : checked[index][subIndex] ? `incorrect` : ``)
                                }`}
                                htmlFor={`${index}-${subIndex}`}
                            >
                                {answer}
                            </label>
                        </div>
                    ))}
                </div>
                <hr></hr>
            </section>
        );
    });

    function handleChange(index, subIndex) {
        const newChecked = checked.map(sub => [...sub]);
        newChecked[index][subIndex] = !newChecked[index][subIndex];
        newChecked[index][subIndex] &&
            newChecked[index].forEach((value, key) => key !== subIndex && (newChecked[index][key] = false));
        setChecked(newChecked);
    }

    function handleSubmit(event) {
        event.preventDefault();
        complete && state === 3 && completedState();
        state === 4 && handleReset();
    }

    function correctAnswersCount() {
        let count = 0;
        questions.forEach(({ answers, correctAnswer }, index) => {
            checked[index][answers.indexOf(correctAnswer)] && count++;
        });
        return count;
    }

    return (
        <form className="container-questions" onSubmit={handleSubmit}>
            {questionElements}
            <div className="results">
                {state === 4 && (
                    <p className="score">{`You scored ${correctAnswersCount()}/${questions.length} correct answers`}</p>
                )}
                <button className="btn" disabled={!complete}>
                    {state === 4 ? `Try again` : `Check answers`}
                </button>
            </div>
        </form>
    );
}

QuizzQuestions.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string.isRequired,
            answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            correctAnswer: PropTypes.string.isRequired
        })
    ).isRequired,
    state: PropTypes.number.isRequired,
    handleReset: PropTypes.func.isRequired,
    completedState: PropTypes.func.isRequired
};
