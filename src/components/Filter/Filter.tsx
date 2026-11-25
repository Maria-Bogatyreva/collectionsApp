import './filter.scss'
import {useState} from "react";
import {handleImgFailed} from "../../utils.ts";
import useCollectionsSearchParams from "../../hooks/useCollectionsSearchParams.ts";
// import useQuestionParams from "../../hooks/useQuestionParams.ts";
import type {AllowedParamName} from "../../hooks/useCollectionsSearchParams.ts";

interface FilterItem {
  id: number;
  title: string;
  imageSrc?: string | null;
}
interface FilterProps {
  filterName: string;
  className?: string;
  filterItems?: FilterItem[];
  hasIcon?: boolean;
  selectedItem: string;
  filterParam: AllowedParamName;
}

export default function Filter({filterName, filterItems=[], selectedItem, filterParam, hasIcon = false, className=''
}: FilterProps) {
  const {handleFilterChange} = useCollectionsSearchParams();
  const [isCollapsed, setIsExpanded] = useState(true);

  const VISIBLE_COUNT = 5

  const visibleItems = isCollapsed ? filterItems.slice(0, VISIBLE_COUNT) : filterItems;

  const hasMoreItems = filterItems.length > VISIBLE_COUNT;

  function handleClick(newValue: number) {
    handleFilterChange(newValue, filterParam);
  }

  function isItemActive(itemId: number) {
    if (filterParam === 'isFree') {
      return selectedItem.toString() ==='true' && itemId === 1 ||
             selectedItem.toString() ==='false' && itemId === 0
    }
    return Number(selectedItem) === itemId;
  }
  return (
    <div className={`filter ${className}`}>
      <div className="filter__title">{filterName}</div>
      <ul className="filter__list">
        {
          visibleItems.map(item =>
            (<li
              key={item.id}
              onClick={()=>handleClick(item.id)}
              className={isItemActive(item.id) ? '_active' : ''}
            >
              {hasIcon && item.imageSrc && <img alt=""
                               src={item.imageSrc}
                               onError={(e) => handleImgFailed(e, '/images/skillImg.png')}/>
              }
              {item.title}
            </li>)
          )
        }
      </ul>
      {hasMoreItems && <a href="#!"
                          className="filter__link link trs"
                          onClick={(e)=> {e.preventDefault(); setIsExpanded(prev => !prev)}}>
                          {isCollapsed ? 'Посмотреть все' : 'Скрыть'}
                       </a>
      }
    </div>
  )
}


