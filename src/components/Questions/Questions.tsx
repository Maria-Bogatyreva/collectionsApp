import './questions.scss'
import QuestionCard from "../QuestionCard/QuestionCard.tsx";
import useQuestions from "../../hooks/useQuestions.ts";
import Pagination from "../Pagination/Pagination.tsx";
import InfoBlock from "../InfoBlock/InfoBlock.tsx";

interface QuestionsProps {
    isFree: boolean;
}
export default function Questions({isFree} : QuestionsProps) {
  const {questions, error, isFetching, total} = useQuestions(isFree);

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
    <>
      <div className="questions">
        <h1 className="questions__title">
          Вопросы
          {
            !isFree &&
              <div className="_pk">
                <a href="" className="questions__link _pk">
                  Стань участником сообщества
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303C13.1768 18.2374 13.1768 17.7626 13.4697 17.4697L18.1893 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H18.1893L13.4697 6.53033C13.1768 6.23744 13.1768 5.76256 13.4697 5.46967Z" fillRule="evenodd" clipRule="evenodd" fill="currentColor"/>
                  </svg>
                </a>
              </div>
          }
        </h1>
          {
            isFree ?
              <>
                {
                  questions.length > 0 ?
                    <ul className="questions__list">
                      {
                        questions.map(question => <li key={question.id}><QuestionCard question={question}/></li>)
                      }
                    </ul>
                    :
                    <>
                      <InfoBlock imageSrc="/images/soonIcon.png" text="Список вопросов Вопросы для данной коллекции скоро появятся"/>
                    </>
                }
              </>
              :
              <>
                <InfoBlock imageSrc='/images/accessIcon.png' text="Список вопросов появится у участников сообщества"/>
                {
                  !isFree &&
                    <div className="_mob _tablet">
                        <a href="" className="questions__link">
                            Стань участником сообщества
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303C13.1768 18.2374 13.1768 17.7626 13.4697 17.4697L18.1893 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H18.1893L13.4697 6.53033C13.1768 6.23744 13.1768 5.76256 13.4697 5.46967Z" fillRule="evenodd" clipRule="evenodd" fill="currentColor"/>
                            </svg>
                        </a>
                    </div>
                }
              </>
          }
      </div>
      {isFree && <Pagination total={total}/>}
    </>

  )
}
