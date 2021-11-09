import { useEffect } from 'react';
import './Landing.scss';
import landingImage from './images/skateboarding-instructor.jpg';
import HrText from '../../components/HrText/HrText';
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
    <main>
      <section className="landing-section">
        <img src={landingImage} alt="Skateboarding Instructor" className="landing-image" />
        <div className="landing-content">
          <h1 className="landing-header-text">Find a Skateboarding Instructor</h1>
          <HrText />
          <h1 className="landing-header-text">Become a Skateboarding Instructor</h1>
          <div className="landing-btn-container">
            <button className="btn btn-primary landing-btn">Find Instructors</button>
            <button className="btn btn-secondary landing-btn">Find Students</button>
          </div>
        </div>
      </section>
      <section id="student-information"></section>
      <section id="instructor-information"></section>
      <section id="trust-and-safety"></section>
    </main>
  );
};

export default Landing;
