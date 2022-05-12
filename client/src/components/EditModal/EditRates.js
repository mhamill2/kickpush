import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const EditRates = ({ user, onChange }) => {
  const rates = user.instructorProfile.rates;
  const groupRate = rates.group || '';
  const privateRate = rates.private || '';

  return (
    <div className="p-4">
      <p className="mb-5">Specify your hourly rates for private lessons, group lessons.</p>

      <div>
        <label htmlFor="private" className="inline-block w-28 text-left">
          Private Rate:
        </label>
        <input defaultValue={privateRate} type="number" name="private" id="private-rate" className="border border-gray-300 rounded p-1 w-20" onChange={onChange} /> /hr
      </div>
      <div className="mt-4">
        <label htmlFor="group" className="inline-block w-28 text-left">
          Group Rate:
        </label>
        <input defaultValue={groupRate} type="number" name="group" id="group-rate" className="border border-gray-300 rounded p-1 w-20" onChange={onChange} /> /hr
      </div>

      <hr className="mt-8" />

      <div></div>
    </div>
  );
};

EditRates.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(EditRates);
