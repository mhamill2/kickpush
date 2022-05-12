import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const EditSocialMediaLinks = ({ onChange, user }) => {
  const labelStyle = 'mt-5 text-sm';
  const inputStyle = 'w-full border border-gray-300 rounded';
  const { facebook, instagram, tiktok, linkedin, twitter } = user.instructorProfile.socialMediaLinks;

  return (
    <div className="p-4">
      <p>Add links to your social media accounts. This helps students verify your identity and build trust!</p>
      <h2 className={labelStyle}>Facebook</h2>
      <input type="text" name="facebook" className={inputStyle} onChange={onChange} defaultValue={facebook} />
      <h2 className={labelStyle}>Instagram</h2>
      <input type="text" name="instagram" className={inputStyle} onChange={onChange} defaultValue={instagram} />
      <h2 className={labelStyle}>TikTok</h2>
      <input type="text" name="tiktok" className={inputStyle} onChange={onChange} defaultValue={tiktok} />
      <h2 className={labelStyle}>LinkedIn</h2>
      <input type="text" name="linkedin" className={inputStyle} onChange={onChange} defaultValue={linkedin} />
      <h2 className={labelStyle}>Twitter</h2>
      <input type="text" name="twitter" className={inputStyle} onChange={onChange} defaultValue={twitter} />
    </div>
  );
};

EditSocialMediaLinks.propTypes = {
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(EditSocialMediaLinks);
