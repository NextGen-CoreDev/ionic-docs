---
previousText: 'Agregando Móvil'
previousUrl: '/docs/angular/your-first-app/5-adding-mobile'
nextText: 'Desarrollo rápido de Apps con Live Reload'
nextUrl: '/docs/angular/your-first-app/7-live-reload'
---

# Desplegando a iOS y Android

Desde que añadimos el Capacitador a nuestro proyecto cuando fue creado por primera vez, solo quedan unos cuantos pasos hasta que la aplicación Galería de Fotos esté en nuestro dispositivo! Recuerda, puedes encontrar el código fuente completo para esta aplicación [aquí](https://github.com/ionic-team/photo-gallery-capacitor-ng).

## Configuración Capacitador

Capacitor es el tiempo de ejecución oficial de la aplicación de Ionic, que facilita el despliegue de aplicaciones web en plataformas nativas como iOS, Android y más. Si has usado Cordova en el pasado, considera leer más sobre las diferencias [aquí](https://capacitor.ionicframework.com/docs/cordova#differences-between-capacitor-and-cordova).

Si todavía estás ejecutando `ionic serve` en el terminal, páralo. Completa una nueva construcción de tu proyecto Ionic, corrigiendo cualquier error que informe:

```shell
<code> $ionic build </code>
```

</code>

A continuación, crear tanto los proyectos iOS como Android:

```shell
<code>
$ ionic cap add ios
$ ionic cap add android
</code>
```

</code>

Se crean carpetas android y iOS en la raíz del proyecto. Estos son proyectos nativos totalmente independientes que deben ser considerados parte de tu aplicación Ionic (Ej. compruébalos en el control de fuente, edítalos usando su herramienta nativa, etc.).

Cada vez que realizas una compilación (p. ej. `build ionic`) que actualiza su directorio web (por defecto: `www`), necesitarás copiar esos cambios en tus proyectos nativos:

```shell
$ ionic cap copy
```

Nota: Después de actualizar la parte nativa del código (como añadir un nuevo plugin), utilice el comando `sync`:

```shell
$ ionic cap sync
```

## Desarrollo iOS

> Para construir una aplicación iOS, necesitarás una computadora Mac.

Las aplicaciones iOS de Capacitor están configuradas y gestionadas a través de Xcode (iOS/Mac IDE), con dependencias administradas por [CocoaPods ](https://cocoapods.org/). Antes de ejecutar esta aplicación en un dispositivo iOS, hay un par de pasos por completar.

Primero, ejecuta el comando `open` de Capacitor, que abre el proyecto nativo de iOS en Xcode:

```shell
$ ionic cap open ios
```

Para que algunos plugins nativos funcionen, los permisos de usuario deben ser configurados. En nuestra aplicación de galería de fotos, esto incluye el complemento de cámara: iOS muestra un diálogo modal automáticamente después de la primera vez que `Camera.getPhoto()` es llamado, sugiriendo al usuario que permita a la aplicación usar la cámara. El permiso que hace esto está etiquetado como "Privacidad - Uso de la cámara". Para configurarlo, el `Info.plist` archivo debe ser modificado ([más detalles aquí](https://capacitor.ionicframework.com/docs/ios/configuration)). Para acceder a ella, haz clic en "Info," luego expande "Propiedades objetivo personalizadas de iOS."

![Xcode Custom iOS Target Properties](/docs/assets/img/guides/first-app-cap-ng/xcode-info-plist.png)


Cada ajuste en `Info.plist` contiene un nombre de parámetro de nivel bajo y un nombre de alto nivel. Por defecto, el editor de la lista de propiedades muestra los nombres de alto nivel, pero a menudo es útil cambiar a mostrar los nombres crudos y de bajo nivel. Para hacer esto, haz clic con el botón derecho del ratón en cualquier lugar del editor de la lista de propiedades y conmuta "Raw Keys/Values".

Localice la llave `NSCameraUsageDescription` (si ha seguido el tutorial debería existir) y establezca el valor a un texto que describa porque la aplicación necesita usar la cámara, como por ejemplo "Tomar fotografías". El valor de este campo será mostrado al usuario cuándo la solicitud de permisos aparezca.

A continuación, haga clic en `App` en el navegador de proyectos al lado izquierdo, luego, dentro de la sección `Signing & Capabilities`, seleccione su Equipo de Desarrollo.

![Xcode - Selecting Development Team](/docs/assets/img/guides/first-app-cap-ng/xcode-signing.png)

¡Ahora que todos los permisos están en orden, es hora de probar la aplicación en un dispositivo real! Conecta un dispositivo iOS a tu Mac, selecciónalo (`App -> iPhone de Carlos`) luego haz clic en el botón "Compilar" para compilar, instalar y ejecutar la aplicación en tu dispositivo:

![Xcode build button](/docs/assets/img/guides/first-app-cap-ng/xcode-build-button.png)

De nuevo, al hacer click en el botón de Cámara en la pestaña de Galería de fotos, el diálogo de solicitud de permisos debería mostrarse. Pulsa Aceptar y haz una foto con la cámara. Después, la foto aparecerá en la aplicación!

![iOS Camera permissions](/docs/assets/img/guides/first-app-cap-ng/ios-permissions-photo.png)

## Despliegue en Android

Las aplicaciones Android Capacitor están configuradas y gestionadas a través de Android Studio. Antes de ejecutar esta aplicación en un dispositivo iOS, hay un par de pasos para completar.

Primero, ejecuta el comando Capacitor `open`, para así abrir el proyecto Android nativo en Android Studio:

```shell
$ ionic cap open ios
```

Al igual que en iOS, debemos conceder los permisos correctos para acceder a la cámara. Para ello, debemos modificar el archivo `AndroidManifest.xml`. Es probable que Android Studio abra este archivo automáticamente, pero en contrario, se podrá abrir manualmente en la ruta `android/app/src/main/`.

![Android Manifest location](/docs/assets/img/guides/first-app-cap-ng/android-manifest.png)

Desplácese a la sección de `Permisos` y asegúrese de que las siguentes entradas están incluidas:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

Guarda el archivo. ¡Ahora que todos los permisos están en orden, es hora de probar la aplicación en un dispositivo real! Conecta un dispositivo Android al equipo. En la interfaz de Android Studio, haz click en el botón de "Ejecutar" (Run), selecciona el dispositivo conectado previamente y haz click en Aceptar para compilar y ejecutar la aplicación en tu dispositivo.

![Launching app on Android](/docs/assets/img/guides/first-app-cap-ng/android-device.png)

De nuevo, al hacer click en el botón de Cámara en la pestaña de Galería de fotos, el diálogo de solicitud de permisos debería mostrarse. Pulsa Aceptar y haz una foto con la cámara. Después, la foto aparecerá en la aplicación.

![Android Camera permissions](/docs/assets/img/guides/first-app-cap-ng/android-permissions-photo.png)

Nuestra aplicación Galería de Fotos ya está desplegada en dispositivos Android e iOS. 🎉

En la última sección de este tutorial, usaremos la funcionalidad Live Reload de Ionic CLI para implementar rápidamente la eliminación de fotos - completando así nuestra función de Galería de Fotos.