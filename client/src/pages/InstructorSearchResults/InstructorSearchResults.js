import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getInstructors } from '../../state/user/userActions';

const InstructorSearchResults = () => {
  const params = new URLSearchParams(useLocation().search);
  const location = params.get('location');
  const history = useHistory();

  const [search, setSearch] = useState(location);

  useEffect(() => {
    //getInstructors(location);
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/search',
      search: `?location=${search}`
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-11/12 m-auto">
      <form className="mt-3" onSubmit={onSubmit}>
        <input type="text" name="location" placeholder="Enter your location" className="h-8 border border-black border-r-0 p-2 rounded-l-md" value={search} onChange={onChange} />
        <button type="submit" className="rounded-r-md rounded-l-none h-8 px-2 border-l-0 bg-gray-100">
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </button>
      </form>
    </div>
  );
};

export default InstructorSearchResults;
