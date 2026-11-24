import './questions.scss'
import QuestionCard from "../QuestionCard/QuestionCard.tsx";
import useQuestions from "../../hooks/useQuestions.ts";

export default function Questions() {
  const {questions, error, isFetching} = useQuestions();

  if (error) {
    return (
      <div className="questions">
        <h1 className="questions__title">Вопросы</h1>
        <p>Не удалось загрузить вопросы</p>
      </div>
    )
  }

  if (isFetching) {
    return (
      <div className="questions">
        <h1 className="questions__title">Вопросы</h1>
        <p>Загрузка...</p>
      </div>
    )
  }

  return (
    <div className="questions">
      <h1 className="questions__title">Вопросы</h1>
      {
        questions.length > 0 ?
          <ul className="questions__list">
            {
              questions.map(question => <li key={question.id}><QuestionCard question={question}/></li>)
            }
          </ul>
          :
          <p>Ничего не найдено</p>
      }
    </div>
  )
}
