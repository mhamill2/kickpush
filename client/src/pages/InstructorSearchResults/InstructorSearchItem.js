import { Link } from 'react-router-dom';

const InstructorSearchItem = ({ instructor, secondaryColor }) => {
  const { instructorProfile } = instructor;

  return (
    <div className={`w-full py-3 px-4 ${secondaryColor ? 'bg-gray-100' : ''}`}>
      <div className="flex justify-start items-center mb-3">
        <span className={`inline-block h-14 w-14 rounded-full overflow-hidden ${secondaryColor ? 'bg-white' : 'bg-gray-100'}`}>
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
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
        <div className={`max-w-1/3 text-sm text-center rounded-lg py-2 px-2 ${!secondaryColor ? 'border-gray-100 bg-gray-100' : 'bg-white'}`}>Private: ${instructorProfile.rates.private} /hr</div>
        <div className={`max-w-1/3 text-sm text-center rounded-lg py-2 px-2 ${!secondaryColor ? 'border-gray-100 bg-gray-100' : 'bg-white'}`}>Group: ${instructorProfile.rates.group} /hr</div>
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
