import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const EditLocation = ({ onChange, user }) => {
  const { city, state, zipCode } = user.location;
  const labelStyle = 'mt-5 text-sm w-1/4';

  return (
    <div className="p-4">
      <p>Enter your location. Your address is not visible to others and is only used for matching you with nearby {user.accountType === 'instructor' ? 'students' : 'instructors'}.</p>
      <div className="flex justify-start">
        <div className="w-1/2 mr-5">
          <h2 className={labelStyle}>City</h2>
          <input type="text" name="city" className="w-full border border-gray-300 rounded p-1" onChange={onChange} defaultValue={city} />
        </div>
        <div className="w-1/6">
          <h2 className={labelStyle}>State</h2>
          <input type="text" name="state" className="w-2/3 border border-gray-300 rounded p-1" onChange={onChange} defaultValue={state} maxLength="2" minLength="2" />
        </div>
      </div>
      <h2 className={labelStyle}>Zip Code</h2>
      <input type="number" name="zipCode" className="border border-gray-300 rounded p-1 w-1/3" onChange={onChange} defaultValue={zipCode} inputmode="numeric" pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$" />
    </div>
  );
};

EditLocation.propTypes = {
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(EditLocation);
