import { useEffect } from 'react';
import landingImage from './images/skateboarding-instructor-flipped.jpg';
import { useSelector } from 'react-redux';

const Landing = (props) => {
  const authenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (authenticated) {
      props.history.push('/dashboard');
    }

    // eslint-disable-next-line
  }, [authenticated, props.history]);

  return (
    <div className="relative bg-white overflow-hidden mb-2">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
          <main className="mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Find your</span> <span className="block text-primary xl:inline">Skateboarding Instructor</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, saepe accusamus, consectetur tempora at dolorum sapiente sunt, perspiciatis qui libero error. Numquam sapiente accusamus sed? Illo recusandae ullam doloribus iste.</p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primaryDark md:py-4 md:text-lg md:px-10">
                    Find an Instructor
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-primary text-base font-medium rounded-md text-primary bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
                    Become an Instructor
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="flex justify-center lg:absolute lg:inset-y-0 lg:right-0">
        <img className="h-56 w-11/12 object-cover rounded-lg lg:rounded-none sm:h-72 md:h-96 lg:w-full lg:h-full" src={landingImage} alt="" />
      </div>
    </div>
  );
};

export default Landing;
