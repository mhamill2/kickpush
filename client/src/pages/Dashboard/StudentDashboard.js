import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import ProfilePicture from '../../components/elements/ProfilePicture';
import ProfilePictureSection from './ProfilePictureSection';

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
    <>
      <section className="bg-white flex flex-col items-center justify-center p-5 w-full my-5 border-0 rounded-md">
        <ProfilePictureSection />
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
    </>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Dashboard);
