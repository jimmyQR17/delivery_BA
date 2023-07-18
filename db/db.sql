CREATE TABLE roles(
id bigserial PRIMARY KEY,
name varchar(180) NOT NULL UNIQUE,
image VARCHAR(255) NULL,
route VARCHAR(255) NULL,
created_at TIMESTAMP(0) not null,
updated_at TIMESTAMP(0)NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;
create table users(
id bigserial PRIMARY KEY,
	email VARCHAR(255) NOT  NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) not null,
	phone VARCHAR(80) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	is_available BOOLEAN null,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL

);
DROP TABLE IF EXISTS user_has_roles CASCADE;

CREATE TABLE user_has_roles(
  id_user BIGSERIAL NOT  NULL,
  id_rol BIGSERIAL NOT NULL,
  created_at TIMESTAMP(0) NOT NULL,
  updated_at TIMESTAMP(0) NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_rol) REFERENCES roleS(id) ON UPDATE CASCADE ON DELETE CASCADE,
 PRIMARY KEY (id_rol,id_user)

);




INSERT INTO roles(
name,
	route,
	image,
	created_at,
	updated_at
)
values(
'CLIENTE',
	'client/home',
	'https://clipart-library.com/images/kTKo7BB8c.png',
	'2021-10-04',
	'2021-10-04'
);
INSERT INTO roles(
name,
	route,
	image,
	created_at,
	updated_at
)
values(
'Restaurante',
	'Restaurante/home',
	'https://w7.pngwing.com/pngs/554/203/png-transparent-restaurant-computer-icons-food-menu-menu-text-eating-plate-lunch.png',
	'2021-10-04',
	'2021-10-04'
);
INSERT INTO roles(
name,
	route,
	image,
	created_at,
	updated_at
)
values(
'Repartidor',
	'Repartidor/home',
	'https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-takeaway-courier-deliveryman-silhouette-vector-image_2287183.jpg',
	'2021-10-04',
	'2021-10-04'
);