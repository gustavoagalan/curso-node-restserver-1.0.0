const { Router } = require('express');
const {check} = require('express-validator');
const {esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios_controllers');
const { validarCampos } = require('../middlewares/validar-campos,js');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', 
[ check('id', 'No es un ID Valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
validarCampos


],
usuariosPut );
router.post('/', 
[   
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser de mas de 6 letras gus').isLength({min:6}),
    check('correo','El correo no es valido Gus Galan').isEmail(),
    check('correo').custom(emailExiste),
 // check('rol', 'No es un rol permitido').isIn([ 'ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
   validarCampos
],
usuariosPost );
router.delete('/', usuariosDelete );
router.patch('/', usuariosPatch );


module.exports = router;