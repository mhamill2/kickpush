import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import _ from 'lodash';

import Spinner from '../../../components/Spinner/Spinner';
import ProfilePicture from '../../../components/ProfilePicture/ProfilePicture';
import ConnectionRequest from '../../../components/ConnectionRequest/ConnectionRequest';

import { getPendingConnectionRequests } from '../../../state/lessons/lessonActions';

const statsItem = 'bg-white flex flex-col items-center justify-center border-0 rounded-md flex-shrink-0 py-8 px-6';

const Dashboard = ({ user }) => {
  useEffect(() => {
    fetchConnectionRequests();
    // eslint-disable-next-line
  }, []);

  const [connectionRequests, setConnectionRequests] = useState({});
  const [selectedConnectionRequest, setSelectedConnectionRequest] = useState({});
  const [loadingConnectionRequests, setLoadingConnectionRequests] = useState(true);
  const [showConnectionRequestModal, setShowConnectionRequestModal] = useState(false);

  const openConnectionRequestModal = (e) => {
    const connectionRequest = connectionRequests[e.target.getAttribute('data-request-id')];
    setSelectedConnectionRequest(connectionRequest);
    setShowConnectionRequestModal(true);
  };

  const closeConnectionRequestModal = () => {
    setShowConnectionRequestModal(false);
  };

  const fetchConnectionRequests = async () => {
    const connectionRequests = await getPendingConnectionRequests();

    setConnectionRequests(connectionRequests);
    setLoadingConnectionRequests(false);
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center w-11/12 m-auto">
        <section className="bg-white flex flex-col items-center justify-center p-5 w-full my-5 border-0 rounded-md">
          <div className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100 mb-2">
            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Hello {user.firstName}!</h1>
          <div className="text-center">{user.hasNextLesson ? `Your next lesson is scheduled with ${user.nextStudent} at ${user.nextLessonTime} on ${user.nextLessonDate}` : 'You have no upcoming lessons scheduled.'}</div>
        </section>

        <section className="w-full flex overflow-x-auto space-x-8 mb-5 scrollbar-hide">
          <div className={statsItem}>
            <h1 className="text-3xl font-semibold">{user.profileViews ? user.profileViews : 0}</h1>
            <p>Profile views this week</p>
          </div>
          <div className={statsItem}>
            <h1 className="text-3xl font-semibold">{user.lessonsScheduled ? user.lessonsScheduled : 0}</h1>
            <p>Lessons this week</p>
          </div>
          <div className={statsItem}>
            <h1 className="text-3xl font-semibold">{user.numOfReviews ? user.numOfReviews : 0}</h1>
            <p>Number of Reviews</p>
          </div>
        </section>

        <section className="flex flex-col items-center justify-start w-full mb-5">
          <div className="border-b border-gray-100 bg-white p-5 w-full">
            <h1 className="text-xl font-bold">Pending Lesson Requests</h1>
          </div>
          <div className={`bg-white w-full p-6 flex flex-col gap-4 ${loadingConnectionRequests || _.isEmpty(connectionRequests) ? 'items-center' : 'justify-start'}`}>
            {loadingConnectionRequests ? (
              <Spinner />
            ) : _.isEmpty(connectionRequests) ? (
              'No pending lesson requests'
            ) : (
              <>
                {Object.entries(connectionRequests).map((connectionRequest) => (
                  <div className="flex items-center cursor-pointer gap-2" key={connectionRequest[0]} data-request-id={connectionRequest[0]} onClick={openConnectionRequestModal}>
                    <ProfilePicture size={10} /> {connectionRequest[1].student.firstName} {connectionRequest[1].student.lastName}
                  </div>
                ))}
              </>
            )}
          </div>
        </section>
      </main>
      <ConnectionRequest showModal={showConnectionRequestModal} closeModal={closeConnectionRequestModal} connectionRequest={selectedConnectionRequest} />
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
