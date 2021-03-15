# Dogstagram!

## ¿Qué es Dogstagram?
Dogstagram es la aplicación para la prueba de [atSistemas](https://atsistemas.com). Se trata de una aplicación web para mostrar fotografías de distintas razas de perro.


## Tecnologías
La aplicación está realizada usando React con Redux escrita en TypeScript. Las principales librerías usadas son:

  * TypeScript
  * React
  * Redux
  * Redux Toolkit
  * Redux Observable
  * React Scripts
  * i18next
  * SASS
  * Jest
  * Testing library


## Características
Se ha realizado la aplicación teniendo en cuenta los requerimientos de la prueba que son:

  * Mostrar un combo-box que permita seleccionar una raza concreta de perro.
  * Usar el servicio de [dog.ceo](https://dog.ceo) para obtener la [lista de razas](https://dog.ceo/api/breeds/list/all) y la [lista de fotografías de cada raza](https://dog.ceo/api/breed/<raza>/images).
  * Recomendación de uso de hooks.
  * Recomendación de muestra de feedback al usuario acerca de estados de carga y errores.
  * Recomendación de uso de herramientas de gestión de estados como Redux.
  * Recomendación de soporte multiidioma.

Y además se han agregado otras características como:

  * Responsive con diseño mobile first inspirado ligeramente en el neomorfismo.
  * Uso de SASS para facilitar la escritura de CSS y animaciones y transiciones CSS nativas para conseguir la máxima fluidez.
  * Muestra de fotografías en pantalla completa.
  * Carga de fotografías bajo demanda con lazy loading.
  * Paneles informativos de ayuda al usuario.
  * Detección de idioma del navegador y carga de locales bajo demanda.
  * Tests de componentes.



## Organización de ficheros
Aunque la aplicación es pequeña se han organizado los ficheros de forma que puedan albergar mejoras y ampliaciones sin problemas e intentando que la estructura sea fácilmente comprensible para desarrolladores junior.

La organización se basa en la separación vista/estado, de ahí la carpeta `state` para albergar la configuración del estado y los slices y la carpeta `views` donde situar las distintas vistas principales o secciones de la aplicación (actualmente sólo una).

Posteriormente se tienen carpetas para distintos objetivos como `app` para encapsular lo relativo al componente principal o shell; `api` para guardar lo relativo a acceso a APIs externas, `assets` para recursos generales necesarios dentro de la app como imágenes, `common` para los componentes generales o que se usen exclusivamente en `app` e `i18n` donde se encuentra la configuración de traducciones.

Dentro de la carpeta de cada vista principal encontramos otra carpeta llamada `components` para incluir los subcomponentes necesarios para cada vista. Aquí se intenta seguir una filosofía estilo _Atomic Design_ sin llegar al extremo, pero teniendo mucho ojo con la eficiencia en componentes evitando marcar como _dirty_ componentes que no lo requieren por tener dependencias que no necesitan. En este aspecto Redux es un buen aliado. También se incluyen los ficheros de tests de cada componente junto con la implementación del mismo.

Finalmente algunos recursos quedan en `public` fuera de `src`, como por ejemplo los ficheros de las claves de traducción. Esto se debe a que por experiencia los ficheros de traducción cuando son a muchos idiomas lastran por tamaño el resto de la aplicación, por lo que prefiero que se descarguen bajo demanda cuando se ha detectado el idioma del navegador. Aún así, es posible cargarlos desde dentro moviendo la carpeta `locales` a `i18n` y actualizando la configuración.


## Detalles a tener en cuenta

### Testing
He agregado la estructura necesaria para poder usar tests con Jest y Testing library usando Redux Toolkit y TypeScript junto con i18next. Las modificaciones están en `setupTests.ts` para saltarnos la descarga de locales para los tests y en `test-utils.js` donde sobrecargamos la función `render` de Testing Library para poder envolver nuestros componentes e inyectar nuestros estados personalizados con los _reducers_ reales.
El caso de `test-utils.js` no es un error, se usa código JS, por lo que llamarlo `.ts` no me parecía útil, aunque se podría tipar si se viera necesario.
En cuanto a tests, he agregado algunos a los componentes que más podían aportar.

### Diseño
Aunque vaya por delante que no soy diseñador, sí que me gusta serlo para mis proyectos propios y sobretodo me esfuerzo siempre en que el aspecto esté cuidado. Por eso he intentado agregar algunas transiciones a la pantalla e innovar con el feedback al usuario, de forma que parte del tiempo de carga cuando selecciona una raza lo pasa viendo una transición, mientras que en la sección donde se encuentra el selecctor se bloquea con un loading y en el lado de la colección de fotografías se muestra un placeholder para saber que ahí cargará una fotografía, pero de forma nativa con CSS para evitar el uso intensivo de plugins.


## Mejoras
Algunas mejoras que se pueden aplicar a la aplicación y que no se han hecho por no complicarlo en exceso la prueba son:

  * Inclusión de un router para cargar la raza desde URL en caso de carga inicial. React-router v6 con los nuevos Hooks son un buen juguete para ello, aunque aún se encuentra en beta.
  * Inclusión de un service worker para controlar la caché de las distintas peticiones. Aunque no requiere mucho trabajo hacerlo manualmente, he visto Workbox de Google que facilita todavía más el trabajo.
  * Inclusión de estados de componente para animaciones CSS, de esa forma las transiciones de estado y la aparición y desaparición de mensajes sería más suave.

---