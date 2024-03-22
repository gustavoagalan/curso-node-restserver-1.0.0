const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarios');
// la U mayuscula es porque podre crear instancias de mi modelo



const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}
const usuariosPost = async (req, res = response) => {

    const  {nombre, correo, password, rol, img} = req.body;
    const usuario= new Usuario({nombre, correo, password, rol, img});

     //Encriptar la contraseña
     const salt = bcryptjs.genSaltSync(10);
     usuario.password = bcryptjs.hashSync(password, salt);

     //Guardar en BD
await usuario.save();
    res.json({
        msg: 'post API - usuariosPost hola gus',
        usuario
    });
}


const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    //datos que no se incluyen en la req, es decir, no se modifican: _id, password, google, correo
    const { _id, password, google,  ...resto } = req.body;
  
    //todo validar contra base de datos
     if (password) {
    // Encriptar la contrasena
        const salt = bcryptjs.genSaltSync(10);
     resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - usuariosPut',
        usuario
    });
}



const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}


    //fixme
    //ugly
    //optimize

