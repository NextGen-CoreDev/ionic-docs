---
previousText: 'Tu primera aplicación con Ionic'
previousUrl: '/docs/angular/your-first-app'
nextText: 'Crear una galería de fotos'
nextUrl: '/docs/angular/your-first-app/creating-photo-gallery-device-storage'
---

# Android, iOS y la Cámara, otra vez!

Anteriormente creamos una aplicación Ionic que se encuentra corriendo en el navegador localmente. Ahora, dirígete a tu dispositivo iOS o Android y comienza a crear la galería de fotos.

## Agregar a Cordova las plataformas iOS y Android

Ionic hace uso del proyecto open source [Cordova](https://cordova.apache.org/docs/en/latest/guide/overview/) para proveer un soporte del hardware nativo. Comenzaremos por agregar las *plataformas* iOS y Android y luego agregaremos *plugins* especifícos como la Cámara:

```shell
$ ionic cordova platform add ios
$ ionic cordova platform add android
```

Estos comandos crearán un archivo `config.xml`, que sirve para definir las caracteristícas y configuraciones de Cordova iOS y Android. Cordova lee este archivo y aplica las configuraciones cada vez que construye un binario de la aplicación nativa.

Para correr la aplicación en DevApp, primero debes agregar la referencia de `cordova.js` en el archivo `index.html`. Abre el archivo que se encuentra en `src/index.html` y agrega la siguiente etiqueta en el `head`:

```html
<head>
  <!-- ... Otras etiquetas HTML... -->

  <script src="cordova.js"></script>
</head>
```

> Nota: Generalmente, al construir la aplicación con Cordova, este script se agregará automáticamente. Puesto que estamos saltando ese paso y usando DevApp, en su lugar tenemos que hacerlo manualmente nosotros mismos.

## Instalar DevApp

Quedan una serie de pasos para configurar las herramientas nativas de [iOS](/docs/installation/ios) y [Android](/docs/installation/android). Vamos a saltarnos eso por ahora. Por suerte, Ionic provee una manera de esquivar esa frustración de lidiar con las herramientas de los SDK nativos: Si, Ionic DevApp!

Ionic DevApp es una aplicación gratuita que permite de manera fácil correr tus aplicaciones Ionic directamente en tus dispositivos iOS o Android. Descárgala de una de las app stores, y abrela en tu dispositivo:

<a href="https://itunes.apple.com/us/app/ionic-devapp/id1233447133?ls=1&mt=8"><img src="/docs/assets/img/guides/first-app-v3/appstore.png"></a>

<p></p>

<a href="https://play.google.com/store/apps/details?id=io.ionic.devapp&hl=en"><img src="/docs/assets/img/guides/first-app-v3/playstore.png"></a>

Luego, inicia sesión en tu cuenta Ionic.

> No tienes una cuenta Ionic? Toca el link de `Sign Up` que se encuentra abajo en la pantalla. Crear una cuenta no sólo te da acceso a DevApp, sino también a las últimas noticias de ionic, eventos en vivo y tutoriales. Además, desbloquea el acceso a actualizaciones de código en vivo (proporciona correcciones de errores y nuevas características más rápido) y compila en la nube nativa (salta pasos de compilación complicados).

Después, abre una terminal y navega a tu proyecto Ionic. Ejecutar lo siguiente:

```shell
$ ionic serve --devapp
```

En DevApp, ahora deberías ver la aplicación. Pulsa sobre ella para cargar la aplicación.

> Si no aparece, o tienes problemas durante la creación de esta aplicación, [vea aquí](https://ionicframework.com/docs/appflow/devapp/).

// ¡Mucho mejor! Ahora puedes añadir la funcionalidad de la cámara. Por cierto, puedes encontrar código de referencia para esto [en GitHub](https://github.com/ionic-team/photo-gallery-tutorial-ionic4).

Volver a `tab2.page.html`, añadir lo siguiente:

```html
<ion-content>
<img>

<ion-fab vertical="bottom" horizontal="center" slot="fixed">
    <ion-fab-button>
      <ion-icon name="camera"></ion-icon>
    </ion-fab-button>
</ion-fab>
</ion-content>
```

Guarda el archivo y mira - apareció un botón de cámara! Tócalo y nota que no hace nada. Vamos a arreglarlo a continuación.

## Añadir dependencias de la cámara a través del CLI

Para usar la cámara, necesitamos introducir sus dependencias nativas y Javascript. Vuelve a la ventana de tu terminal, ejecuta el siguiente comando, que añade la biblioteca JavaScript al proyecto, exponiendo así la API de la cámara en el código TypeScript:

```shell
$ npm install @ionic-native/camera
```

En el archivo `package.json`, notarás que se ha añadido una nueva dependencia JavaScript, con un número de versión similar a lo siguiente:

`"@ionic-native/camera": "^5.4.0"`

A continuación, ejecuta este comando para añadir el código iOS nativo y Android, permitiendo que la cámara funcione en un dispositivo móvil. Para más información sobre cómo funciona esto, lee en [Cordova](https://cordova.apache.org/docs/en/latest/guide/overview/) y [Nativo Ionic](https://ionicframework.com/docs/native).

```shell
$ ionic cordova plugin add cordova-plugin-camera
```

El archivo `config.xml` ahora se encuentra actualizado para usar la cámara nativa con un código similar al siguiente:

```xml
<plugin name="cordova-plugin-camera" spec="^4.0.3" />
```

El siguiente paso sólo es necesario para los usuarios de iOS. A partir de iOS 10, los desarrolladores deben proporcionar una explicación de por qué la aplicación desea acceder a la cámara del dispositivo. Añade esto al fondo de `config.xml`:

```xml
<!-- Required for iOS 10: Camera permission prompt -->
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>Used to take pictures</string>
</edit-config>
```

## Añadir el plugin de la cámara al módulo de la aplicación angular

Hay un paso más que debemos hacer ya que este es un proyecto Angular: registrar la cámara en el módulo de la aplicación (`src/app/app.module.ts`). Primero, importar el módulo de cámara:

```Javascript
importar { Camera } desde '@ionic-native/camera/ngx';
```

Luego, agregarlo en los providers:

```Javascript
proveedores: [
    StatusBar,
    SplashScreen,
    Cámara,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
```

Ahora puede ser utilizado en cualquiera de nuestras páginas.

## Añadir la cámara a la página de la galería

Nuestro botón de cámara no hace nada todavía. En la página `tab2.page.html`, añade un clic handler al botón:

```html
<ion-fab vertical="bottom" horizontal="center" slot="fixed">
  <ion-fab-button (click)="takePicture()">
    <ion-icon name="camera"></ion-icon>
  </ion-fab-button>
</ion-fab>
```

Luego, actualiza el placeholder de la imagen. Lo siguiente enlaza la variable “currentImage” (que trabajaremos a continuación) a la imagen para mostrar al usuario.

```html
<img [src]="currentImage" *ngIf="currentImage">
```

A continuación, abre `tab2.page.ts` e importa la biblioteca de la cámara:

```Javascript
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
```

A continuación, define la variable “currentImage” e inyecta la cámara a esta clase a través del constructor:

```Javascript
export class Tab2Page {
  currentImage: any;

  constructor(private camera: Camera) { }
}
```

Por último, añade el método "takePicture" en `tab2.page.ts`. Ya está enlazado para que se ejecute una vez que el botón de la cámara sea pulsado:

```Javascript
export class Tab2Page {
  currentImage: any;

  constructor(private camera: Camera) { }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }
}
```

¡Tome nota: no hay ninguna referencia a iOS o Android! Esta es la impresionante potencia de los plugins: utiliza una API (`camera.getPicture()` en este caso) y el plugin se encarga de las diferencias de plataforma por vos. Escribe una vez, ejecuta en todas partes. 😀

Guarda este archivo y pulsa el botón de la cámara en DevApp. ¡Voila! La cámara debe abrirse en tu dispositivo. Una vez que se ha tomado una foto, se muestra en la página de la Galería de Fotos.

A continuación, veremos cómo transformar la aplicación en una galería de fotos, así como cómo guardar las fotos en tu dispositivo!

<div style="text-align:right;">
  <docs-button href="/docs/angular/your-first-app/creating-photo-gallery-device-storage">Continuar <svg viewBox="0 0 512 512"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg></docs-button>
</div>
