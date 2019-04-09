import user from './controllers/userController';

export default (app) => {
    app.route('/user')
        .post(user.createUser);

    app.route('/user/:userId')
        .get(user.getUser)
        .put(user.updateUser);
};
