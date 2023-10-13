import Steps from '@site/src/components/global/Steps';
import Step from '@site/src/components/global/Step';

<!-- import javascript from './javascript.md';
import react from './react.md';
import vue from './vue.md'; -->

import angular from './angular.md';

<Steps code={{angular}}>

<Step index="1" lines="1" highlighted="true">
  Headers are a root component of a page that align to the top of the page. Setting the <code>translucent</code>
  property on the header allows for content to scroll behind it in iOS.
</Step>

<Step index="2" lines="2,3,4,5,6">
  Toolbars can contain several different components including titles, buttons, icons, back buttons, menu buttons,
  searchbars, segments, progress bars, and more.
</Step>

<Step index="3" lines="3,4,5">
  Title is a text component that sets the title for a toolbar. It can be used to describe the screen or section a user
  is currently on or the app being used.
</Step>

<Step index="4" lines="4">
  The title of this page is currently "Blank". Try changing it to something else to see it update at the top of your
  app.
</Step>

<Step index="5" lines="9">
  The content component provides an easy to use content area with some useful methods to control the scrollable area.
  The <code>fullscreen</code> property is required in order for the content to scroll behind the transparent header.
</Step>

<Step index="6" lines="10,11,12,13,14">
  A condensed header inside of a content is used for iOS. It will show a large toolbar title and then collapse it to a
  small title when scrolling.
</Step>

<Step index="7" lines="16,17,18,19">
  The text in this container div is everything that will show up inside of the content for this page. Try changing the
  text to something else and watch the content update.
</Step>

</Steps>
