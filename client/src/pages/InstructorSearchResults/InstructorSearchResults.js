import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getInstructors } from '../../state/search/searchActions';

import InstructorSearchItem from '../../components/InstructorSearchItem/InstructorSearchItem';

const InstructorSearchResults = () => {
  const params = new URLSearchParams(useLocation().search);
  const location = params.get('location');
  const history = useHistory();
  const [search, setSearch] = useState(location);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    console.log('here');
    fetchInstructors();
    // eslint-disable-next-line
  }, []);

  const fetchInstructors = async () => {
    const instructors = await getInstructors(search);
    setInstructors(instructors);
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/search',
      search: `?location=${search}`
    });
    instructors.length = 0;
    fetchInstructors();
  };

  return (
    <div className="flex flex-col justify-center m-auto">
      <form className="my-5 ml-4" onSubmit={onSubmit}>
        <input type="text" name="location" placeholder="Enter your location" className="h-8 border border-black border-r-0 p-2 rounded-l-md" value={search} onChange={onChange} />
        <button type="submit" className="rounded-r-md rounded-l-none h-8 px-2 border-l-0 bg-gray-100">
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </button>
      </form>

      {instructors.map((instructor, index) => (
        <InstructorSearchItem key={instructor._id} instructor={instructor} secondaryColor={index % 2 === 0} />
      ))}
    </div>
  );
};

export default InstructorSearchResults;
