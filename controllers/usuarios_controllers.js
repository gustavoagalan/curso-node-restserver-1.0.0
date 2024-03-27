const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarios');
//const Role = require('../models/role');
// la U mayuscula es porque podre crear instancias de mi modelo

const usuariosGet = async (req = request, res = response) => {

   const { desde = 1, limite = 2} = req.query;
   const query = {estado: true};

   const [totales, usuariosgus ] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).
   skip( Number(desde)).
   limit(Number(limite))
    ])
      res.json({
      totales,
      usuariosgus
    });
}

const usuariosPost = async (req, res = response) => {
    const  {nombre, correo, password, img} = req.body;
    const usuario= new Usuario({nombre, correo, password, img});

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
    //datos que no se incluyen en la req, es decir, 
    //no se modifican: _id, password, google, correo
    const { _id, google, password, ...resto } = req.body;
  
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
   // res.json(usuario);
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});


    res.json({
        msg: 'delete API - usuariosDelete',
       usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
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

