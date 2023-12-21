---
previousText: '添加移动版'
previousUrl: '/docs/angular/your-first app/5-adding-mobile'
nextText: '使用实时重载快速开发应用程序'
nextUrl: '/docs/angular/your-firstapp/7-live-reload'
---

# 部署到 iOS 和 Android

由于我们是在首次创建Capacitor时将其添加到项目中的，因此只有几步之遥，直到在我们的设备上使用Photo Gallery应用程序为止！ 请记住，您可以在这里找到此应用的完整源代码 [](https://github.com/ionic-team/photo-gallery-capacitor-ng)。

## Capacitor 设置

Capacitor是Ionic的官方运行时，它使得在本地平台如iOS、Android等安装网络应用变得容易。 如果您以前使用过Cordova，请考虑阅读更多 [差异的信息](https://capacitor.ionicframework.com/docs/cordova#differences-between-capacitor-and-cordova) 。

如果您仍在终端中运行 `ionic service` ，请取消它。 完成你的Ionic项目的新构建，修复它报告的错误：

```shell
$ ionic build
```

接下来，创建iOS和Android项目：

```shell
$ ionic cap add ios
$ ionic cap add android
```

项目根目录下的 android 和 ios 文件夹都已创建。 这些是完全独立的本地项目，应被视为你的Ionic应用程序的一部分(即：将其检入源代码管理，使用其本机工具进行编辑等)。

每次您执行构建(例如`ionic build`)来更新您的Web目录(默认值：`www`)时，都需要将这些更改复制到本地项目中：

```shell
$ ionic cap copy
```

注意：对代码的本机部分进行更新 (例如添加新插件) 后，请使用`sync`命令：

```shell
$ ionic cap sync
```

## iOS 部署

> 要构建一个 iOS 应用程序，您将需要一个 Mac 苹果电脑。

Capacitor iOS 应用程序是通过Xcode (Apple's iOS/Mac IDE) 配置和管理的，依赖关系由CocoaPod 管理。 在 iOS 设备上运行此应用程序之前，有几个步骤要完成。

首先，运行 Capacitor `open` 命令，打开Xcode中的原生iOS项目：

```shell
$ ionic cap open ios
```

为了使一些本地插件能够工作，必须配置用户权限。 在我们的照片库应用中，其中包括相机插件：首次调用`Camera.getPhoto()`后，iOS会自动显示一个模式对话框，提示用户允许该应用使用相机。 驱动此操作的权限标记为“隐私-相机使用情况”。 要进行设置，必须修改`Info.plist`文件([更多详细信息](https://capacitor.ionicframework.com/docs/ios/configuration)) 。 要访问它，请点击"Info"，然后展开"Custom iOS Target Properties"。

![Xcode自定义iOS目标属性](/docs/assets/img/guides/first-app-cap-ng/xcode-info-plist.png)


`Info.plist`中的每个设置都有一个低级参数名称和一个高级名称。 默认情况下，属性列表编辑器会显示高级别的名称，但切换到显示低级名称往往是有用的。 要做到这一点，请右键单击属性列表编辑器中的任何位置，并切换"Raw Keys/Values"。

定位到`NSCameraUsageDescription`键 (如果你一直跟随着本教程，它应该已经存在) 并设置值来描述应用程序需要使用相机的原因， 例如"拍摄照片"。当权限提示打开时，值的字段将显示给App用户。

接着，点击左侧项目导航器中的 `App` 然后在 `Signing & Capabilities` 部分中选择您的开发团队.

![Xcode - 选择开发团队](/docs/assets/img/guides/first-app-cap-ng/xcode-signing.png)

我们已经准备好在一个真正的设备上试用这个应用程序，并且已经选择了开发团队！ 将 iOS 设备连接到您的 Mac 计算机， 选择它(`App -> Matthew's iPhone`) 然后点击"Build"按钮进行构建， 安装并在您的设备上启动应用：

![Xcode 构建按钮](/docs/assets/img/guides/first-app-cap-ng/xcode-build-button.png)

当点击照片库标签上的相机按钮时，权限提示将被显示。 点击"OK"，然后使用相机拍摄照片。 然后这张照片会在应用中显示！

![iOS 相机权限](/docs/assets/img/guides/first-app-cap-ng/ios-permissions-photo.png)

## Android 部署

Capacitor Android 应用程序是通过Android Studio配置和管理的。 在 Android 设备上运行此应用程序之前，需要完成几个步骤。

首先，运行 Capacitor `open` 命令，打开Android Studio的原生Android项目：

```shell
$ ionic cap open android
```

类似iOS，我们必须启用正确的权限才能使用摄像头。 在 `AndroidManifest.xml` 文件中配置它们。 Android Studio 很可能会自动打开此文件，但如果它没有，请在 `android/app/src/main` 下找到它。

![Android清单位置](/docs/assets/img/guides/first-app-cap-ng/android-manifest.png)

滚动到 `Permissions` 部分并确保包含这些条目：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

保存文件。 拥有权限，我们已准备好在真正的设备上试试应用！ 将 Android 设备连接到您的电脑。 在 Android Studio 中，单击"Run"按钮，选择附加的 Android 设备，然后单击确定以生成、安装并在您的设备上启动应用程序。

![在 Android 上启动应用程序](/docs/assets/img/guides/first-app-cap-ng/android-device.png)

再次点击相机选项卡上的相机按钮时，会显示相机提示。 点击"OK"，然后拍摄相机照片。 之后，照片应出现在应用程序中。

![Android 相机权限](/docs/assets/img/guides/first-app-cap-ng/android-permissions-photo.png)

我们的照片库应用程序刚刚部署到 Android 和 iOS 设备。 🎉

在本教程的最后部分， 我们将使用 Ionic CLI Live Reload 功能来快速执行照片删除 - 从而完成我们的照片库功能。