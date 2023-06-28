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

<br>
Solo pueden acceder un `Paciente` o `Administrador`, para solicitar un turno se debe seleccionar al **especialista**, la **especialidad** y luego el turno disponible que mas se ajuste a su horario. 
<br>
Cabe recalcar que no todos los especialistas tienen turnos disponibles, esto depende de si crearon turnos o no.
<br>
En caso de que el usuario sea un `Administrador`, tambien debera seleccionar el **paciente** al que le asignará el turno.





