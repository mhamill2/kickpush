import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ user }) => {
  const { city, state } = user.location;
  const address = city && state ? `${city}, ${state}` : '';
  const [search, setSearch] = useState(address);
  const history = useHistory();

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (search !== '') {
      history.push({
        pathname: '/search',
        search: `?location=${search}`
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-11/12 m-auto">
      <section className="bg-white flex flex-col items-center justify-center p-5 w-full my-5 border-0 rounded-md">
        <div className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100 mb-2">
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">Hello {user.firstName}!</h1>
        <div className="text-center">
          {user.hasNextLesson
            ? `Your next lesson is scheduled with ${user.nextStudent} at ${user.nextLessonTime} on ${user.nextLessonDate}`
            : 'You have no upcoming lessons scheduled.\nFind an instructor near you!'}
        </div>
        <form className="mt-3" onSubmit={onSubmit}>
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            className="h-8 border border-black border-r-0 p-2 rounded-l-md"
            value={search}
            onChange={onChange}
          />
          <button type="submit" className="border border-black cursor-pointer rounded-r-md rounded-l-none h-8 px-2 border-l-0 bg-gray-100">
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </button>
        </form>
      </section>

      <section className="flex flex-col items-center justify-start w-full mb-5">
        <div className="border-b border-gray-100 bg-white p-5 w-full">
          <h1 className="text-xl font-bold">Pending Lesson Requests</h1>
        </div>
        <div className="bg-white w-full py-12 text-center">{!user.pendingRequests ? 'No pending lesson requests' : 'all requests go here'}</div>
      </section>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Dashboard);
