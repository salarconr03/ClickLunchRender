const router = require('express').Router();
const { postNewUser, postLogin, postLogout, updateOneUser, getAllUsers, getOneUser, authOneUser, deleteOneUsuario, getUserPerId, searchForVerifyList, verifyUser } = require('../controllers/usuario.controller');

//Registrar usuario
router.post('/register', postNewUser);

//Iniciar sesion
router.post('/login', postLogin);

//Salir de la sesion
router.post('/logout', postLogout);

//Actualizar usuario
router.put('/updateUser', updateOneUser);

//Obtener todos los registros
router.get('/usersData', getAllUsers);

//Obtener un registro
router.get('/userData', getOneUser);

//Autenticacion de usuario
router.get('/authUser', authOneUser);

//Eliminar usuario
router.delete('/deleteUsuario', deleteOneUsuario);

router.post('/userPerID', getUserPerId);

//Exporte de ruta
router.post('/searchVerifyList', searchForVerifyList);

router.post('/verify', verifyUser);

//Exporte de ruta
module.exports = router;