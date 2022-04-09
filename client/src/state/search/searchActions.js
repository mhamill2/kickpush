import axios from 'axios';

const getInstructors = async (searchParms) => {
  try {
    const res = await axios.get('/getInstructors?', { params: { location: searchParms } });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { getInstructors };
