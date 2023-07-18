const User = require('../models/user');
const Rol = require('../models/rol');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage= require('../utils/cloud_storage')
module.exports = {

 async getAll(req, res, next) {
try {
    const data = await User.getAll();
    console.log(`Usuarios: ${data}`);
    return res.status(201).json(data);
} catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
        sucess: false,
        message: 'Error al obtener los usuarios'
    });
}

 },
  async register(req, res, next) {
    try {
        const user = req.body;
        const data = await User.create(user);
        
        await Rol.create(data.id, 1);
        const token = jwt.sign({ id: data.id,email: user.email}, keys.secretOrKey,{

            //expiresIn: 
        })
        
        const myData={
        
            id: data.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            image: user.image,
            session_token: `JWT ${token}`
        
        };

        return res.status(201).json({

            success: true,
            message: 'El registro se realizo correctamente',
            data: myData
        });

    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
          sucess: false,
          message: 'Hubo un error con el registro del usuario',
          error: error

        });
    }
 

  },

  async login(req, res, next) {
    
     
    try {
       
        const email = req.body.email;
        const password = req.body.password;
        let data = '';
  
      
        const myUser = await User.findByEmail(req.body.email);

        if(!myUser){

            return res.status(401).json({

                success: false,
                message: 'El email no fue encontrado'
            })
        }
        
        const isPasswordValid= await bcrypt.compare(password, myUser.password);
  
        if (isPasswordValid){

            const token = jwt.sign({

                id: myUser.id,
                email: myUser.email
            }, keys.secretOrKey,{

                //expiresIn: 
            })

            const data={

                id: myUser.id,
                name: myUser.name,
                lastname: myUser.lastname,
                email: myUser.email,
                phone: myUser.phone,
                image: myUser.image,
                session_token: `JWT ${token}`,
                roles: myUser.roles

            };
            console.log(`Usuario enviado${data}`)
        return res.status(201).json({
           success: true,
           message: 'El ususario ha sido autentificado',
           data: data
           

        });
        }
        else{
            return res.status(401).json({
                success: false,
                message: 'La contraseña es incorrecta',
                data: data
                
     
             });

        }
        
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
          success: false,
          message: 'Hubo un error con el login del usuario',
          error: error
    });

  }
},
async update(req, res, next){
 try{
  const user = JSON.parse(req.body.user); // cliente debe enviar un objeto
  console.log('Usuario PArseado', user);
  const files = req.files;

  if (files.length > 0) {//Cliente nos envia un archivo

 const pathImage = `image${Date.now()}`;//Nombre del archivo
 const url = await storage(files[0], pathImage);
    if (url != undefined && url != null) {
         user.image = url;
    }

  }
  await User.update(user); // guiardando la Url en la base de datos
  return res.status(201).json({
      success: true,
      message: 'Los datos del usuario se ha actualizado correctamente',
      data:user

  });

 }catch{

    console.log(`Error:${error}`);
    return res.status(501).json({

    success: false,
    message: 'hubo un error al actualizar los datos del usuario',
    error:error

    })
 }

}



};