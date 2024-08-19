const { db } = require('../config/firebaseConfig');

exports.addUserProfile = async (req, res) => {
    try {
        const userRef = db.collection('user_profile').doc('001');
        await userRef.set({
            // user_id:'001',
            name: req.body.name,
            nickname: req.body.nickname,
            birthDate: req.body.birthDate,
            biography: req.body.biography,
            reading_preferences: req.body.reading_preferences,
            phoneNumber: req.body.phoneNumber,
            socialMedias: req.body.socialMedias,
            profile_picture: req.body.profile_picture,
            created_at: new Date(),
            updated_at: new Date()
        });

        res.status(200).send('User profile added successfully');
    } catch (error) {
        res.status(500).send('Error adding user: ' + error.message);
    }
};


exports.getAllUsersProfile= async (req, res) => {
    try {
        const usersRef = db.collection('user_profile');
        const snapshot = await usersRef.get();

        if (snapshot.empty) {
            res.status(404).send('No users found');
            return;
        }

        let users = [];
        snapshot.forEach(doc => {
            users.push(doc.data());
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error getting users: ' + error.message);
    }
};

exports.getUserProfileID = async (req, res) => {
    try {
        const userRef = db.collection('user_profile').doc("001");
        console.log('userRef', userRef);
        const doc = await userRef.get();
        if (!doc.exists) {
            res.status(404).send('No such user!');
        } else {
            res.status(200).json(doc.data());
        }
    } catch (error) {
        res.status(500).send('Error getting user: ' + error.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userRef = db.collection('user_profile').doc(req.params.id);
        await userRef.update({
            name: req.body.name,
            nickname: req.body.nickname,
            birthDate: req.body.birthDate,
            biography: req.body.biography,
            reading_preferences: req.body.reading_preferences,
            phoneNumber: req.body.phoneNumber,
            socialMedias: req.body.socialMedias,
            profile_picture: req.body.profile_picture,
            updated_at: new Date()
        });

        res.status(200).send('Profile updated successfully');
    } catch (error) {
        res.status(500).send('Error updating profile: ' + error.message);
    }
};


exports.updateUserProfile = async (req, res) => {
    try {
        const userRef = db.collection('user_profile').doc(req.params.id);
        await userRef.update({
            codUser: req.body.codUser,
            name: req.body.name,
            nickname: req.body.nickname,
            birthDate: req.body.birthDate,
            biography: req.body.biography,
            reading_preferences: req.body.reading_preferences,
            phoneNumber: req.body.phoneNumber,
            socialMedias: req.body.socialMedias,
            profile_picture: req.body.profile_picture,
            updated_at: new Date()
        });

        res.status(200).send('User updated successfully');
    } catch (error) {
        res.status(500).send('Error updating user: ' + error.message);
    }
};

exports.deleteUserProfile = async (req, res) => {
    try {
        const userRef = db.collection('user_profile').doc(req.params.id);
        await userRef.delete();
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user: ' + error.message);
    }
};
