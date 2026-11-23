import './collection.scss'

import {useParams} from "react-router-dom";
import {useGetCollectionByIdQuery} from "../../services/collectionsApi.ts";
import {handleImgFailed} from "../../utils.ts";
import {skipToken} from "@reduxjs/toolkit/query";

export default function Collection() {
  const {id} = useParams();
  const {data: collection, isLoading, error} = useGetCollectionByIdQuery(id ?? skipToken)

  const fallbackSrc = '/images/collectionImg.jpg';


  console.log(collection)

  if (isLoading) return <p>Загрузка коллекции…</p>
  if (error) return <p>Не удалось загрузить коллекцию.</p>
  if (!collection) return <p>Данные коллекции отсутствуют.</p>
  return (
    <main className="main collection">
      <div className="container collection__inner">
        <div className="collection__body">
          <div className="collection__body-item collection__caption">
            <div className="collection__img">
              <img alt="" src={collection.imageSrc || fallbackSrc}
                   onError={(e) => handleImgFailed(e, '/images/collectionImg.jpg')}/>
            </div>
            <div>
              <div className="collection__title">{collection.title}</div>
              <div className="collection__desc">{collection.description}</div>
            </div>
          </div>
          <div className="collection__body-item">
            Вопросы у коллекции
          </div>
        </div>
        <div className="collection__info">
          <div className="collection__info-inner collection__information">
            <div className="collection__info-item">
                <div className="collection__info-title">Специализация</div>
                <ul className="collection__info-list">
                  {
                    collection.specializations.map(s => (
                      <li key={s.id}>{s.title}</li>
                    ))
                  }
                </ul>
            </div>
            <div className="collection__info-item">
                <div className="collection__info-title">Доступ</div>
                <ul className="collection__info-list">
                  <li>{collection.isFree ? 'Для всех' : 'Для участников'}</li>
                </ul>
            </div>
            {
              collection.company &&
              <div className="collection__info-item">
                <div className="collection__info-title">Компания</div>
                <ul className="collection__info-list">
                  <li>
                    {
                      collection.company.imageSrc &&
                      <img alt=""
                           src={collection.company.imageSrc}
                           onError={(e) => handleImgFailed(e, '/images/collectionImg.jpg')}/>
                    }
                    {collection.company.title}
                  </li>
                </ul>
              </div>
            }
            <div className="collection__info-item">
                <div className="collection__info-title">Количество вопросов</div>
                <ul className="collection__info-list">
                  <li>
                    {collection.questionsCount}
                  </li>
                </ul>
            </div>
            <div className="collection__info-item">
              <div className="collection__info-title">Ключевые слова</div>
              <ul className="collection__info-keywords">
                {
                  collection.keywords.map((k, index) => (
                    <li key={index}><a href="#">{`#${k}`}</a></li>
                  ))
                }
              </ul>
            </div>
            {collection.createdBy &&
              <div className="collection__info-item">
                <small>Автор: <a>{collection.createdBy.username}</a></small>
              </div>
            }
          </div>
        </div>
      </div>
    </main>
  )
}
