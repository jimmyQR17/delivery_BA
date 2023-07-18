const db = require('../config/config');
const bcrypt = require('bcryptjs')

const User ={};

User.getAll = () => {
    
    
    const sql = `
    SELECT
        *
    FROM
        users
    `;
     return db.manyOrNone(sql);
}

User.findByEmail=(email) => {
    const sql =`
    Select 
   U.id,
   U.email,
   U.name,
   U.lastname,
   U.image,
   U.phone,
   U.password,
   U.session_token,
   JSON_AGG(
   json_build_object(
        'id', R.id,
	   'name', R.name,
	   'image', R.image,
	   'route', R.name
   )
   )AS roles
from 
users AS U
INNER JOIN 
user_has_roles AS  UHR
on

UHR.id_user = U.id

inner join
roles AS R
on 
R.id=UHR.id_rol

 where
 U.email= $1
 GROUP BY
 U.id
    
    `;

    return db.oneOrNone(sql, email)
}


User.findById = (id, callback) => {

    const sql =`
    Select 
   id,
   email,
   name,
   lastname,
   image,
   phone,
   password,
   session_token
from 
users
 where
 id= $1
    
    `;

    return db.oneOrNone(sql, id).then(user =>{callback(null, user)})
}





User.create = async (user) =>{


    const hash = await bcrypt.hash(user.password, 10);

const sql = `
INSERT INTO
    users(
        email,
        name,
        lastname,
        phone,
        image,
        password,
        created_at,
        updated_at
    )
   VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
`;
  return db.oneOrNone(sql, [
     user.email,
     user.name,
     user.lastname,
     user.phone,
     user.image,
     hash,
     new Date(),
     new Date()
      
  ])
}
User.update =  (user) =>{
const sql = `
UPDATE 
	users
SET
    name=$2  ,
    lastname=$3 ,
    phone = $4 ,
    image=$5,
	updated_at= $6
WHERE
	id= $1

`;
return db.none(sql, [
 user.id,
 user.name,
 user.lastname,
 user.phone,
 user.image,
 new Date()

]);

}

module.exports = User;