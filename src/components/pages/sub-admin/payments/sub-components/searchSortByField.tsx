import search from '../../../../../assets/images/search.svg';
import arrowDown from '../../../../../assets/images/chevron-compact-down.svg';
import filter from '../../../../../assets/images/funnel-fill.svg';

const searchSortByField = () => {
  return (
    <div className='searchAndSort searchAndSortAlginment'>
      <div className='searchAndSort'>
        <input className='searchAndSortField' placeholder='Search' />
        <img className='searchIcon' src={search} alt='' />
      </div>
      <div className='searchAndSort'>
        <input className='searchAndSortField' placeholder='Sort By' />
        <img className='sortIcon' src={arrowDown} alt='' />
      </div>
      <div className='searchAndSort'>
        <button className='filter'>Filter</button>
        <img className='filterIcon' src={filter} alt='' />
      </div>
    </div>
  );
};

export default searchSortByField;
