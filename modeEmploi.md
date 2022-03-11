## PROJECT

I have used a NestJS back-end with POstGresQL database.

I have used Docker to create a container for postgresQL, install Docker here : https://www.docker.com/products/docker-desktop

after installed, then type in your terminal :
`docker run --name {name_Your_container} -p 5432:5432 -e POSTGRES_PASSWORD=root -d postgres`

you will have the id of the container '34767677dgjfhgj etc.."

then, install pgAdmin : https://www.pgadmin.org/download/

create a server (give it a name for example Server3000) with the port and the password postgres you have had before, create also a database named 'root' in Server3000/databases.

Now you can do after cloning :

`cd back`

`yarn start:dev`

Normally it has to render 0 errror.

For the front, I have used React with TypeScript :

`cd front`

`npm start`
