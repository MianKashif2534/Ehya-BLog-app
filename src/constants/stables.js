// // stables.js
// const UPLOAD_FOLDER_BASE_URL = "http://localhost:5000/uploads/";
// const API_BASE_URL = "http://localhost:5000";
// const stables = { UPLOAD_FOLDER_BASE_URL , API_BASE_URL};

// export default stables;

const UPLOAD_FOLDER_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/uploads/`;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const stables = { UPLOAD_FOLDER_BASE_URL , API_BASE_URL};

export default stables;