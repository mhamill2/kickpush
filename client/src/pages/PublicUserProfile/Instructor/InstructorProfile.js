import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faSnapchatGhost, faTiktok, faInstagramSquare, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHouseChimneyUser, faLaptop } from '@fortawesome/free-solid-svg-icons';

const InstructorProfile = ({ profile }) => {
  const { bio, rates, lessonLocations, agesTaught, skillLevelsTaught, socialMediaLinks } = profile;

  const { private: privateRate, group: groupRate, other: otherRates } = rates;
  const { skatepark, instructorsHome, studentsHome, virtual } = lessonLocations;
  const { children, teens, adults } = agesTaught;
  const { beginner, intermediate, advanced } = skillLevelsTaught;
  const { facebook, instagram, tiktok, snapchat, linkedin, twitter } = socialMediaLinks;

  const areRatesSet = privateRate || groupRate || otherRates;
  const areLessonLocationsSet = skatepark || instructorsHome || studentsHome || virtual;
  const areAgesSet = children || teens || adults;
  const areSkillLevelsSet = beginner || intermediate || advanced;
  const areSocialMediaLinksSet = facebook || instagram || tiktok || snapchat || linkedin || twitter;

  return (
    <>
      {bio && (
        <section id="background" className="border-b-4 p-5">
          <div className="flex justify-between">
            <h1 className={sectionHeadingStyle}>Background</h1>
          </div>
          <div>{bio ? bio : 'Add a background to tell students about yourself'}</div>
        </section>
      )}

      {areRatesSet && (
        <section id="rates" className="border-b-4 p-5">
          <div className="flex justify-between">
            <h1 className={sectionHeadingStyle}>Rates</h1>
          </div>
          <div className="flex flex-col">
            {(privateRate != 0 || groupRate != 0) && (
              <div className="mr-4">
                <h2 className="text-lg font-semibold">Standard Rates</h2>
                {privateRate && (
                  <p className="mt-1">
                    Private Lessons: {'$'}
                    {privateRate}/hr
                  </p>
                )}
                {groupRate && (
                  <p className="mt-1">
                    Group Lessons: {'$'}
                    {groupRate}/hr
                  </p>
                )}
              </div>
            )}
            {otherRates.length > 0 && (
              <div className="mt-3">
                <h2 className="text-lg font-semibold">Special Rates</h2>
                {otherRates.map((rate, index) => (
                  <p className="mt-1">
                    {rate.title}: {'$'}
                    {rate.rate}/hr
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section id="lesson-info" className="border-b-4 p-5">
        <div className="flex justify-between">
          <h1 className={sectionHeadingStyle}>Lesson Info</h1>
        </div>
        <div>
          {areLessonLocationsSet && (
            <>
              <h2 className="text-lg font-semibold mb-3">Location</h2>
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 justify-center mb-8">
                {skatepark && (
                  <div className="flex justify-center items-center flex-col border border-gray-100 bg-gray-100 rounded-lg p-2">
                    <img className="h-16 w-16" src="/images/quarterpipe.svg" alt="skatepark" />
                    <p className="text-sm">Skatepark</p>
                  </div>
                )}
                {instructorsHome && (
                  <div className="flex justify-center items-center flex-col border border-gray-100 bg-gray-100 rounded-lg p-2">
                    <FontAwesomeIcon icon={faHouseChimneyUser} className="h-14 w-14"></FontAwesomeIcon>
                    <p className="text-sm">Instructors Home</p>
                  </div>
                )}
                {studentsHome && (
                  <div className="flex justify-center items-center flex-col border border-gray-100 bg-gray-100 rounded-lg p-2">
                    <FontAwesomeIcon icon={faHouseChimneyUser} className="h-14 w-14"></FontAwesomeIcon>
                    <p className="text-sm">Students Home</p>
                  </div>
                )}
                {virtual && (
                  <div className="flex justify-center items-center flex-col border border-gray-100 bg-gray-100 rounded-lg p-2">
                    <FontAwesomeIcon icon={faLaptop} className="h-14 w-14"></FontAwesomeIcon>
                    <p className="text-sm">Virtual</p>
                  </div>
                )}
              </div>
            </>
          )}

          {areAgesSet && (
            <>
              <h2 className="text-lg font-semibold mt-3 mb-3">Ages</h2>
              <div className="flex justify-start mb-8 flex-wrap gap-2">
                {children && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-7">Children</div>}
                {teens && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-7">Teens</div>}
                {adults && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-7">Adults</div>}
              </div>
            </>
          )}

          {areSkillLevelsSet && (
            <>
              <h2 className="text-lg font-semibold mt-3 mb-3">Skill Level</h2>
              <div className="flex justify-start flex-wrap gap-2">
                {beginner && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-4">Beginner</div>}
                {intermediate && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-4">Intermediate</div>}
                {advanced && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-4">Advanced</div>}
              </div>
            </>
          )}
        </div>
      </section>

      {areSocialMediaLinksSet && (
        <section id="social-links" className="p-5 mb-20">
          <div className="flex justify-between">
            <h1 className={sectionHeadingStyle}>Social Media</h1>
          </div>
          <div className="flex justify-start flex-wrap gap-5">
            {facebook && (
              <a href={facebook}>
                <FontAwesomeIcon icon={faFacebookSquare} size="2x"></FontAwesomeIcon>
              </a>
            )}
            {tiktok && (
              <a href={tiktok}>
                <FontAwesomeIcon icon={faTiktok} size="2x"></FontAwesomeIcon>
              </a>
            )}
            {instagram && (
              <a href={instagram}>
                <FontAwesomeIcon icon={faInstagramSquare} size="2x"></FontAwesomeIcon>
              </a>
            )}
            {snapchat && (
              <a href={snapchat}>
                <FontAwesomeIcon icon={faSnapchatGhost} size="2x"></FontAwesomeIcon>
              </a>
            )}
            {linkedin && (
              <a href={linkedin}>
                <FontAwesomeIcon icon={faLinkedin} size="2x"></FontAwesomeIcon>
              </a>
            )}
            {twitter && (
              <a href={twitter}>
                <FontAwesomeIcon icon={faTwitter} size="2x"></FontAwesomeIcon>
              </a>
            )}
          </div>
        </section>
      )}
    </>
  );
};

const sectionHeadingStyle = 'text-2xl mb-5 inline-block mr-3';

export default InstructorProfile;
