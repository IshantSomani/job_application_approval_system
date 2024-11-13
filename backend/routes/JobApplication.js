const express = require("express");
const upload = require("../middleware/multer");
const { getApplications, addApplications, updateApplications, getUserApplications } = require("../controller/JobApplication");

const router = express.Router();

router.get('/getapplications', getApplications);
router.get('/getUserApplications/:email', getUserApplications);
router.post('/applications', upload.single('cvUrl'), addApplications);
router.put('/applications/:id', updateApplications);

module.exports = router;