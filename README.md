First

You need Windows System Operative
Download and Install all updates of January 2025.

Now Dowload NODE JS version 18.20.6

Download GIT Version 2.47.1


Now use the command npm install to install all the dependencies.

Create a .env file in the root folder and add the following variables:

```
DB_USER = your DB user
DB_PASS = your DB password
IP_SERV = your IP of server
API_VER = VER3
DB_NAME = Adquisiciones
KEY_PRI = a key encoded in base64
```

Now import the file API Directions in insomnia software
Create a "Base Environment" variable following the next example
{
    "BASE_PATH": "http://localhost:3050/VER3"
}

http://localhost: -> your IP server
3050 -> Your Ambient Port "recomendation: use 3050 to development, 3040 to testing and 3030 to production"

if you use another ports, change the value of APPORT in the root file index.js

Create a country Chile using the controller "Create Country"
Create a region using the controller "Create Region"
Create a Commune usign the controller "Register Commune"
Create a Depto or Cost Center using the controller "Create Depto". Recomendation: create the Sistemas Depto using the next data.
"deptoCode" : "01110",
"deptoName" : "Sistemas",
"deptoNom" : "SIS"

Now Create a Subdepto asociated to the created Depto using the controller "Create Subeptos". Recomendation: create the Adquisiciones Subdepto using the next data
"subdeptoName" : "Adquisiciones", 
"deptoLink" : _id Sistemas depto

Now Create a Subdepto Process asociated to created Subdepto using the controller "Create Subdepto Process". Recomendation create the Solicitudes Subdepto Process using the next data

"subdeptoProcessName" : "Solicitudes",
"subdeptoLink" : _id Adquisiciones Subdepto

Now Create a action asociated to created Subdepto Function using the controller "Create Action". Recomendation:  create the next 2 actions using this data

"actionName" : "Crear Solicitud"
"processLink" : _id Solicitudes Subdepto Process

"actionName" : "Ver Solicitudes",
"processLink" : _id Solicitudes Subdepto Process

Now create the next Permissons using the controller "Create Permisson"

"permissonCode" : "111111"
"permissonName" : "Jupiter"
"postName" : "Super Admin"


"permissonCode" : "111110"
"permissonName" : "Ganimedes"
"postName" : "Gerente Zonal/General"


"permissonCode" : "111100"
"permissonName" : "Calisto"
"postName" : "Usuario"

"permissonCode" : "111001"
"permissonName" : "Io"
"postName" : "Gerente Departamento"


"permissonCode" : "111000"
"permissonName" : "Europa"
"postName" : "Jefe Subdepartamento"


"permissonCode" : "101000"
"permissonName" : "Amaltea"
"postName" : "Cliente"

You are almost ready

Now create the next 2 views using the controller "Create View"

"viewName" : "Crear Solicitud"
"frontPath" : "/CreateRequest"
"viewPermisson" : "101000"
"actionLink" : _id Action crear solicitud

"viewName" : "Ver Solicitudes"
"frontPath" : "/SearchRequest"
"viewPermisson" : "101000"
"actionLink" : _id Action Ver solicitudes

Finally you can create a user using the controller "Create User"
Use the next data to create one

"firstname" : "Your First Name", 
"secondname" : "Your Second Name", 
"lastname" : "Your Lasname", 
"secondSurname" : "Your Second Surname", 
"email" : "Your Email", 
"username" : "Your username", 
"permissonName" : "Jupiter" in this case use the jupiter permisson, 
"password" : "Your Password", 
"depto" : "_id Your Depto", 
"subDepto" : "_id Your Subdepto"

Now you need Assing views yo yourself
use the controller "Set View To User"
"id" : "Your _id",
"viewID" : [
	"_id view"
]

For default your user is inactive, use the controller "Change User Status" to change your status
"id" : Your ID

Now you can use the base aplication
You can create buy requests, add teh asociated documentation and view the status of the buy requests
##