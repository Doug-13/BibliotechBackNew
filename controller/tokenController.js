const jwt = require('jsonwebtoken');

exports.validaToken = async (req, res) => {
    const { token } = req.body;
    console.log('Valida Token', token);

    try{
        if (!token) {
            res.status(400).json({valid: false});
    } else {
        jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
            if (err) {
                res.status(401).json({valid: false});
            } else {
                res.status(200).json({valid: true});
            }
        });
    }
} catch (err) {
    console.log('Erro ao validar Token', err);
}};