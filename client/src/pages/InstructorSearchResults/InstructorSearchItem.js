import { Link } from 'react-router-dom';
import ProfilePicture from '../../components/elements/ProfilePicture';

const InstructorSearchItem = ({ instructor, secondaryColor }) => {
  const { instructorProfile } = instructor;

  return (
    <div className={`w-full py-3 px-4 ${secondaryColor ? 'bg-gray-100' : ''}`}>
      <div className="flex justify-start items-center mb-3">
        <span className={`inline-block h-14 w-14 rounded-full overflow-hidden ${secondaryColor ? 'bg-white' : 'bg-gray-100'}`}>
          <ProfilePicture avatarUrl={instructor.avatarUrl} />
        </span>
        <div className="ml-3">
          <h1 className="text-lg">
            {' '}
            {instructor.firstName} {instructor.lastName}
          </h1>
          <h2 className="text-sm">
            {' '}
            {instructor.location.city}, {instructor.location.state}{' '}
          </h2>
        </div>
      </div>

      <p>{instructor.bio}</p>
      <div className="flex justify-start gap-2 mb-3">
        <div className={`max-w-1/3 text-sm text-center rounded-lg py-2 px-2 ${!secondaryColor ? 'border-gray-100 bg-gray-100' : 'bg-white'}`}>
          Private: ${instructorProfile.rates.private} /hr
        </div>
        <div className={`max-w-1/3 text-sm text-center rounded-lg py-2 px-2 ${!secondaryColor ? 'border-gray-100 bg-gray-100' : 'bg-white'}`}>
          Group: ${instructorProfile.rates.group} /hr
        </div>
      </div>

      <div>
        <Link to={`/instructors/${instructor._id}`}>
          <button className="border border-black cursor-pointer w-full px-4 rounded-full bg-white">View Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default InstructorSearchItem;
