import db from '../db';

const validateStep = step => {
    return step >= 1 && step <= 4;
};

exports.getUser = (req, res) => {
    const result = db.get('users')
      .find({ id: req.params.userId })
      .value();

    if (result) {
        return res.json( result );
    }

    return res.send('User not found');
};

exports.createUser = (req, res) => {

    if (!req.body.id || !req.body.step){
        return res.send('Pass id and step');
    }

    const step = parseInt(req.body.step, 10);

    if (!validateStep(step)){
        return res.send('Pass valid step value');
    }

    db.get('users')
        .push({ id: req.body.id, step})
        .write();

    return res.json({result: 'Ok'})
};

exports.updateUser = (req, res) => {
    if (!req.body.step){
        return res.send('Pass step value');
    }

    const step = parseInt(req.body.step, 10);

    if (!validateStep(step)){
        return res.send('Pass valid step value');
    }

    db.get('users')
        .find({ id: req.params.userId })
        .assign({ step })
        .write();

    return res.json({result: 'Ok'})
};
