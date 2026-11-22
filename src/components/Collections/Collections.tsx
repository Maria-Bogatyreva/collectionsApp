import './collections.scss'
import CollectionCard from "../CollectionCard/CollectionCard.tsx";
import useCollections from "../../hooks/useCollections.ts";

export default function Collections() {
const {collections} = useCollections();

  return (
    <div className="collections">
      <h1 className="collections__title">Коллекции</h1>
      {
        collections.length > 0 ?
          <ul className="collections__list">
            {
              collections.map(collection => <li key={collection.id}><CollectionCard collection={collection}/></li>)
            }
          </ul>
          :
          <p>Ничего не найдено</p>
      }
    </div>
  )
}
