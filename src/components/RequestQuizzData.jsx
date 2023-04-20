// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

export default function RequestQuizzData(props) {
  const {
    amount,
    category,
    difficulty,
    type,
    categories,
    handleState,
    changeValues
  } = props;

  const categoriesOptions = categories.map(({ name, id }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));
  categoriesOptions.unshift(
    <option key="#" value="">
      --Select one category--
    </option>
  );

  return (
    <div className="query-container">
      <h1>Setting your quizz</h1>
      <p>
        Test your knokledge<span>🧠</span>
      </p>
      <label htmlFor="amount" className="amount-range">
        Questions number: {amount}
      </label>
      <input
        type="range"
        id="amount"
        name="amount"
        className="range"
        min="5"
        max="20"
        value={amount}
        onChange={changeValues}
      />
      <select name="category" id="category" value={category} onChange={changeValues}>
        {categoriesOptions}
      </select>
      <select name="difficulty" id="difficulty" value={difficulty} onChange={changeValues}>
        <option value="">--Select the difficulty--</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <select name="type" id="type" value={type} onChange={changeValues}>
        <option value="">--Select one type of questions--</option>
        <option value="multiple">Multiple choises</option>
        <option value="boolean">True/False</option>
      </select>
      <button
        className="set-quizz-btn"
        disabled={category && type && difficulty ? false : true}
        onClick={handleState}
      >
        Start Quizz 🚀
      </button>
    </div>
  );
}

RequestQuizzData.propTypes = {
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  handleState: PropTypes.func.isRequired,
  changeValues: PropTypes.func.isRequired
};
