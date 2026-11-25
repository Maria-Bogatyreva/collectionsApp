import './collections.scss'
import CollectionCard from "../CollectionCard/CollectionCard.tsx";
import type {Collection} from "../../services/collectionsApi.types.ts";

interface CollectionsProps {
  collections: Collection[];
}

export default function Collections({ collections }: CollectionsProps) {
  return (
    <div className="collections">
      <h1 className="collections__title">Коллекции</h1>
      {
        collections.length > 0 ?
          <ul className="collections__list">
            {
              collections.map((collection) => <li key={collection.id}><CollectionCard collection={collection}/></li>)
            }
          </ul>
          :
          <p>Ничего не найдено</p>
      }
    </div>
  )
}
