const JobApplication = require("../model/jobApplication");
const uploadOnCloudinary = require("../utils/cloudinary");

exports.getApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find()
        return res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching applications:", error);
        return res.status(500).send({ message: 'Server error while fetching applications' });
    }
};

exports.getUserApplications = async (req, res) => {
    const { email } = req.params;
    try {
        const applications = await JobApplication.find({ email: email });

        if (applications.length > 0) {
            return res.status(200).json(applications);
        } else {
            return res.status(200).json([]);
        }
    } catch (error) {
        console.error("Error fetching applications:", error);
        return res.status(500).send({ message: 'Server error while fetching applications' });
    }
};
exports.addApplications = async (req, res) => {
    try {
        const cvFile = req.file.path;
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;

        if (!cvFile) {
            return res.status(500).json({ error: 'Failed to process application. File is require.' })
        }

        const upload = await uploadOnCloudinary(cvFile);
        console.log("upload:", upload);

        // Check if the upload was successful
        if (!upload || !upload.url) {
            return res.status(500).json({ error: 'Failed to process application. Please upload a valid file.' });
        }


        const jobApplication = new JobApplication({
            name,
            email: email.toLowerCase(),
            phone,
            cvFile: upload.url,
            status: 'pending'
        });

        await jobApplication.save();

        const userCheck = await JobApplication.findById(jobApplication._id);
        console.log("userCheck:", userCheck);

        if (!userCheck) {
            return res.status(500).json({ error: 'Job Application not added in database. Please try again.' });
        }

        return res.status(200).json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error processing application:', error);
        return res.status(500).json({ error: 'Failed to process application. Please try again later.' });
    }
};

exports.updateApplications = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!['pending', 'review', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status. Allowed values: pending, review, approve' });
        }

        const jobApplication = await JobApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!jobApplication) {
            return res.status(404).json({ message: 'Job Application not found' });
        }

        console.log("jobApplication: ", jobApplication);
        return res.status(200).json(jobApplication);
    } catch (error) {
        console.error("Error updating application:", error);
        return res.status(400).json({ message: error.message || 'Error updating application' });
    }
};