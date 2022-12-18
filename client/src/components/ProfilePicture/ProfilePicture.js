import { useEffect, useState } from 'react';
const { v4: uuidv4 } = require('uuid');

const ProfilePicture = ({ avatarUrl }) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!avatarUrl) {
      return;
    }

    const image = new Image();
    image.src = avatarUrl;
    image.onload = () => setIsValid(image.complete);
    image.onerror = () => setIsValid(false);
  }, [avatarUrl]);

  return (
    <>
      {isValid && avatarUrl ? (
        <img src={`${avatarUrl}?${uuidv4()}`} className="h-full w-full object-cover" alt="User avatar" />
      ) : (
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </>
  );
};

export default ProfilePicture;

<svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>;
