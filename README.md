# Trabajo Practico Labo IV "La clinica"
En este documento se detallará tanto las secciones que contiene, como su funcionamiento.
<br>
## Bienvenido
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/8c490f63-b30b-4408-bf74-f9180b035538)
<br>
Esta es la seccion de **bienvenida**, tiene accesso **cualquier** usuario, esté o no logueado. <br>
Desde la barra de navegacion podrias acceder a los botones `Iniciar sesión` y `Registrarme`, que te llevaran a sus respectivas secciones.<br>
<br>
## Iniciar sesión
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/69407ac0-2023-46e2-a85e-100f8c8f5404)
<br>
Desde acá podes iniciar sesion ingresando tu correo electronico y contraseña. <br>
A esta seccion solo pueden acceder los usuarios que aun no iniciaron sesión.<br>
Tambien se mostrara un botón `FAB`.<br>

### FAB
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/892f17a3-3936-440c-a3c4-d5307e2945ee)<br>
Este botón te permitira acceder de forma rapida al sistema con una cuenta del tipo que selecciones.
<br>

## Registrarme
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/9bb8f2dd-a0d4-48cb-a6e1-51eb455e1b5c)
<br>
Aca podes **crear** una cuenta nueva de cualquier tipo: `Paciente`, `Especialista`. El `Administrador` solo lo puede crear otro **administrador**.<br>
Dependiendo de que tipo elijas los datos necesarios para la creacion van a cambiar.
<br>

## Perfil
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/3ae680ed-b7b3-4d7a-ba89-8d6d4ec802da)
<br>
A este apartado solo pueden acceder los usuarios **logueados**, y en él se mostrarán toda la informacion personal del usuario.<br>
Si el usuario es un **Especialista** se le mostrará el botón `Mis horarios`,
y si es un **Paciente** se mostrará el botón `Ver mi historial`

### Ver mi historial:
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/892480ba-ef2a-493b-89ec-d64b42fe4501)
<br>
Este botón enviará al paciente a la seccion `Historia Clinica`

### Mis horarios: 
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/e44d961e-b28c-4c78-9ed1-610716fafc45)
<br>
Este boton despliega una ventana en la que el **especialista** podrá cambiar los dias que desea atender por cada especialidad que tenga. 
<br>
<br>
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/15249e16-e47f-4e74-b92c-7a3b9bc25c42)
<br>
Dentro de esta ventana, para hacer efectivos los cambios debe presionar el boton `Actualizar`.<br>
El botón `Crear Turnos` desplegará una ventana modal: 
<br> 
<br>
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/8267b664-3d4a-4cc6-9965-cc639be2eec8)
<br>
Se debe seleccionar la especialidad y el dia, esto generará los dias disponibles dentro de los proximos 15 dias. <br>
Una vez seleccionado todo, se completa el alta con el botón `aceptar`, lo que creará los turnos con un estado `libre`<br>

## Usuarios
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/d5b3e361-081c-4bab-a343-254ee2ea5b5b)
<br>
A esta seccion solo puede acceder el **administrador**, mostrará un listado de todos los especialistas y pacientes que esten registrados.
Dentro de este listado podrá `habilitar` o `deshabilitar` el acceso de un **especialista** o consultar el `historial` de un **paciente**.
<br>

### Crear nuevo:
Envia al **administrador** a la pagina de `registro` para que pueda dar de alta un usuario.
<br>
### Excel: 
**Exporta** la informacion de los usuarios a una tabla en un documento `xlsx`.
<br>
### FAB:
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/e0b94ec0-9308-42d1-beb4-1cbda1f133c0)
<br>
Muestra los **pacientes** y al seleccionar uno, **exporta** la informacion de todos sus turnos `realizados` a un documento `xlsx`.
<br>

## Solicitar turno
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/10c1edcf-bf17-4853-80ae-36a8b25f8461)

Solo pueden acceder un `Paciente` o `Administrador`, para solicitar un turno se debe seleccionar al **especialista**, la **especialidad** y luego el turno disponible que mas se ajuste a su horario. 
<br>
Cabe recalcar que no todos los especialistas tienen turnos disponibles, esto depende de si crearon turnos o no.
<br>
En caso de que el usuario sea un `Administrador`, tambien debera seleccionar el **paciente** al que le asignará el turno.

## Gestionar turnos
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/d6c1f701-db49-414b-8bf1-f56607ea2612)
Solo pueden acceder un `Administrador`, esta seccion mostrará un listado de todos los turnos con un estado distinto a `libre`, 
el cual se podrá filtar por todos sus campos, ademas de darle la posibilidad de **rechazar** un turno `pendiente` especificando los motivos. 
<br>

Tambien habrá un switch que alternará el **modo** en el cual se mostrará la información de la tabla así como su contenido. 
<br>
<br>
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/1a80ae45-54e2-4a55-b230-e76e559f625b)
<br>
<br>
Al activarlo, mostrara solo los turnos con estado `realizado` con todos los datos del control hecho por el `Especialista`:
<br>
<br>
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/e1139429-8170-42fa-a4b7-861d776fe4ae)
<br>
<br>
Ademas de agregar mas filtros:
<br>
<br>
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/2899d91a-195a-4458-a198-67b1d2e97e0a)

## Pacientes
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/4f0bddba-6098-415a-bd0a-8d965af905fe)

Solo puede acceder un `Especialista`, mostrará una lista de todos los `Pacientes` que atendió por los menos **una vez** el `Especialista`, 
desde este listado tambien podrá acceder a la **historia clinica** del `Paciente`.
<br>
### FAB:
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/c5871b7d-e4bc-43bd-ac2e-17793b4ef5e4)

Este botón te permitirá elegir a un `Paciente` y al seleccionarlo, **cambiará el contenido** de la tabla y mostrará todos los **turnos** que tuvo ese paciente con el `Especialista`.
<br>
<br>
![image](https://github.com/S3RGIO-G/tp-final-labo/assets/60524882/f941519c-d54a-4dc8-8505-c0ad610b9d3a)






