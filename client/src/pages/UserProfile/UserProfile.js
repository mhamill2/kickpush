import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faSnapchatGhost, faTiktok, faInstagramSquare, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPenToSquare, faHouseChimneyUser, faLaptop } from '@fortawesome/free-solid-svg-icons';

import EditProfileModal from './EditProfileModal';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch({ type: 'NAV_PROFILE' });
    // eslint-disable-next-line
  }, []);

  const [showEditModal, setShowEditModal] = useState(false);
  const [title, setTitle] = useState(null);

  const { bio, rates, lessonLocations, agesTaught, skillLevelsTaught, socialMediaLinks } = user.instructorProfile;

  const { private: privateRate, group: groupRate, other: otherRates } = rates;
  const { skatepark, instructorsHome, studentsHome, virtual } = lessonLocations;
  const { children, teens, adults } = agesTaught;
  const { beginner, intermediate, advanced } = skillLevelsTaught;
  const { facebook, instagram, tiktok, snapchat, linkedin, twitter } = socialMediaLinks;

  const areLessonLocationsSet = skatepark || instructorsHome || studentsHome || virtual;
  const areAgesSet = children || teens || adults;
  const areSkillLevelsSet = beginner || intermediate || advanced;
  const areSocialMediaLinksSet = facebook || instagram || tiktok || snapchat || linkedin || twitter;

  const openEditModal = (title) => {
    setTitle(title);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <main className="pt-3">
        <section id="heading" className="flex justify-around items-center border-b-4 pb-5">
          <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <div className="text-sm">West Melbourne, FL</div>
          </div>
        </section>

        <section id="background" className="border-b-4 p-5">
          <div className="flex justify-between">
            <h1 className={sectionHeadingStyle}>Background</h1>
            <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" onClick={() => openEditModal('Background')}></FontAwesomeIcon>
          </div>
          <div>{bio ? bio : 'Add a background to tell students about yourself'}</div>
        </section>

        <section id="rates" className="border-b-4 p-5">
          <div className="flex justify-between">
            <h1 className={sectionHeadingStyle}>Rates</h1>
            <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" onClick={() => openEditModal('Rates')}></FontAwesomeIcon>
          </div>
          <div className="flex justify-start flex-wrap">
            {!privateRate && !groupRate && otherRates.length <= 0 && <div>Update your rates so students know how much you charge</div>}
            {(privateRate !== 0 || groupRate !== 0) && (
              <div className="mr-4">
                <h2 className="text-lg font-semibold">Standard Rates</h2>
                {privateRate && <p className="mt-1">Private Lessons: $60/hr</p>}
                {groupRate && <p className="mt-1">Group Lessons: $40/hr</p>}
              </div>
            )}
            {otherRates.length > 0 && (
              <div className="mt-3">
                <h2 className="text-lg font-semibold">Special Rates</h2>
                {otherRates.forEach((value) => {
                  <p className="mt-1">{`${value.title}: $${value.rate}/hr`}</p>;
                })}
              </div>
            )}
          </div>
        </section>

        <section id="lesson-info" className="border-b-4 p-5">
          <div className="flex justify-between">
            <h1 className={sectionHeadingStyle}>Lesson Info</h1>
            <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" onClick={() => openEditModal('Lesson Info')}></FontAwesomeIcon>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Location</h2>
            {areLessonLocationsSet ? (
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
            ) : (
              <div>Update where you want your lessons to take place</div>
            )}

            <h2 className="text-lg font-semibold mt-3 mb-3">Ages</h2>
            {areAgesSet ? (
              <div className="flex justify-evenly mb-8 flex-wrap">
                {children && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-7">Children</div>}
                {teens && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-7">Teens</div>}
                {adults && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-7">Adults</div>}
              </div>
            ) : (
              <div>Specify what ages you are able to teach</div>
            )}

            <h2 className="text-lg font-semibold mt-3 mb-3">Skill Level</h2>
            {areSkillLevelsSet ? (
              <div className="flex justify-evenly flex-wrap">
                {beginner && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-4">Beginner</div>}
                {intermediate && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-4">Intermediate</div>}
                {advanced && <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-4">Advanced</div>}
              </div>
            ) : (
              <div>Specify what skill levels you can teach</div>
            )}
          </div>
        </section>

        <section id="social-links" className="p-5 mb-20">
          <div className="flex justify-between">
            <h1 className={sectionHeadingStyle}>Social Media</h1>
            <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" onClick={() => openEditModal('Social Media')}></FontAwesomeIcon>
          </div>
          {areSocialMediaLinksSet ? (
            <div className="flex justify-evenly flex-wrap">
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
          ) : (
            <div>Add social media links</div>
          )}
        </section>
      </main>
      <EditProfileModal title={title} showModal={showEditModal} closeModal={closeEditModal} />
    </>
  );
};

const sectionHeadingStyle = 'text-2xl mb-5 inline-block mr-3';

export default UserProfile;
