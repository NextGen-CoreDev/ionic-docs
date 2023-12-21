---
previousText: 'Deploying Mobile'
previousUrl: '/docs/angular/your-first-app/6-deploying-mobile'
nextText: 'Lifecycle'
nextUrl: '/docs/angular/lifecycle'
---

# Développement rapide des applications avec Rechargement en Direct

Jusqu'à présent, nous avons vu à quel point il est facile de développer une application multi-plateforme qui fonctionne partout. L'expérience de développement est assez rapide, mais que se passerait-il si je vous disais qu'il y avait un moyen d'aller plus vite?

Nous pouvons utiliser la [fonctionnalité Live Reload de Ionic CLI](https://ionicframework.com/docs/cli/livereload) pour améliorer notre productivité lors de la construction d'applications Ionic. Lorsque cette option est activée, Rechargement en direct rechargera le navigateur et/ou WebView lorsque les modifications de l'application sont détectées.

## Recharge en direct

Vous vous souvenez de `service ionique`? C’était Live Reload qui travaillait dans le navigateur, nous permettant d’itérer rapidement.

Nous pouvons également l'utiliser lors du développement sur les appareils iOS et Android. Ceci est particulièrement utile lors de l'écriture de code qui interagit avec les plugins natifs - nous devons l'exécuter sur un appareil pour vérifier que cela fonctionne. Par conséquent, il est crucial de pouvoir écrire rapidement, construire, tester et déployer du code rapidement pour maintenir notre vitesse de développement.

Nous allons utiliser Live Reload pour implémenter la suppression de photos, la pièce manquante de notre fonctionnalité de Galerie de Photos. Sélectionnez votre plateforme de choix (iOS ou Android) et connectez un périphérique à votre ordinateur. Ensuite, exécutez l'une ou l'autre des commandes dans un terminal, basé sur la plateforme que vous avez choisie :

```shell
$ ionic cap run ios -l --external

$ ionic cap run android -l --external
```

Le serveur Live Reload va démarrer, et l'IDE natif de choix s'ouvrira s'il n'est pas déjà ouvert. Dans l'IDE, cliquez sur le bouton Play pour lancer l'application sur votre appareil.

## Effacement des photos

Avec Live Reload en cours d'exécution et l'application s'ouvre sur votre appareil, implémentons la fonctionnalité de suppression de photos. Ouvrez `tab2.page.html` et ajoutez un nouveau gestionnaire de clic à chaque élément `<ion-img>`. Lorsque l'utilisateur de l'application clique sur une photo dans notre galerie, nous afficherons une boîte de dialogue [Feuille d'Action](https://ionicframework.com/docs/api/action-sheet) avec l'option de supprimer la photo sélectionnée ou d'annuler (fermer) la boîte de dialogue.

```html
<ion-col size="6" 
    *ngFor="let photo of photoService.photos; index as position">
  <ion-img [src]="photo.webviewPath" 
           (click)="showActionSheet(photo, position)"></ion-img>
</ion-col>
```

Over in `tab2.page.ts`, import Action Sheet and add it to the constructor:

```typescript
import { ActionSheetController } from '@ionic/angular';

constructor(public photoService: PhotoService, 
            public actionSheetController: ActionSheetController) {}
```

Add `Photo` to the import statement.

```typescript
import { Photo, PhotoService } from '../services/photo.service';
```

Next, implement the `showActionSheet()` function. We add two options: `Delete` that calls PhotoService’s `deletePicture()` function (to be added next) and `Cancel`, which when given the role of “cancel” will automatically close the action sheet:

```typescript
public async showActionSheet(photo: Photo, position: number) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Photos',
    buttons: [{
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.photoService.deletePicture(photo, position);
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        // Nothing to do, action sheet is automatically closed
        }
    }]
  });
  await actionSheet.present();
}
```

Save both of the files we just edited. The Photo Gallery app will reload automatically, and now when we tap on one of the photos in the gallery, the action sheet displays. Tapping “Delete” doesn’t do anything yet, so head back into your code editor.

In `src/app/services/photo.service.ts`, add the `deletePicture()` function:

```typescript
public async deletePicture(photo: Photo, position: number) {
  // Remove this photo from the Photos reference data array
  this.photos.splice(position, 1);

  // Update photos array cache by overwriting the existing photo array
  Storage.set({
    key: this.PHOTO_STORAGE,
    value: JSON.stringify(this.photos)
  });

  // delete photo file from filesystem
  const filename = photo.filepath
                      .substr(photo.filepath.lastIndexOf('/') + 1);

  await Filesystem.deleteFile({
    path: filename,
    directory: FilesystemDirectory.Data
  });
}
```

The selected photo is removed from the Photos array first. Then, we use the Capacitor Storage API to update the cached version of the Photos array. Finally, we delete the actual photo file itself using the Filesystem API.

Save this file, then tap on a photo again and choose the “Delete” option. This time, the photo is deleted! Implemented much faster using Live Reload. 💪

## Et ensuite ?

Congratulations! You built a complete cross-platform Photo Gallery app that runs on the web, iOS, and Android. There are many paths to follow from here. Try adding another [Ionic UI component](https://ionicframework.com/docs/components) to the app, or more [native functionality](https://capacitor.ionicframework.com/docs/apis). The sky’s the limit.

Happy app building! 💙
