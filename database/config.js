const mongoose = require('mongoose');

const dbConexion = async () => {
    try{

         await   mongoose.connect(
            process.env.MONGODB_CONEXION,
            {//useNewUrlParser: true,
          // userUnifieldTopology: true,
          /*  useCreateIndex:true,
            useFindAndModify: false,*/
         
        });
console.log('base de datos online');


    }
    catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos');
    }


}


module.exports = {
    
    dbConexion


}