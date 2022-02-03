const EditSocialMediaLinks = () => {
  const labelStyle = 'mt-5 text-sm';
  const inputStyle = 'w-full border border-gray-300 rounded';

  return (
    <div className="p-4">
      <p>Add links to your social media accounts. This helps students verify your identity and build trust!</p>
      <h2 className={labelStyle}>Facebook</h2>
      <input type="text" className={inputStyle}></input>
      <h2 className={labelStyle}>Instagram</h2>
      <input type="text" className={inputStyle}></input>
      <h2 className={labelStyle}>TikTok</h2>
      <input type="text" className={inputStyle}></input>
      <h2 className={labelStyle}>LinkedIn</h2>
      <input type="text" className={inputStyle}></input>
      <h2 className={labelStyle}>SnapChat</h2>
      <input type="text" className={inputStyle}></input>
      <h2 className={labelStyle}>Twitter</h2>
      <input type="text" className={inputStyle}></input>
    </div>
  );
};

export default EditSocialMediaLinks;
