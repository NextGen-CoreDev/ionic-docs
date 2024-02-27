---
title: "ion-picker"
---
import Props from '@ionic-internal/component-api/v8/picker/props.md';
import Events from '@ionic-internal/component-api/v8/picker/events.md';
import Methods from '@ionic-internal/component-api/v8/picker/methods.md';
import Parts from '@ionic-internal/component-api/v8/picker/parts.md';
import CustomProps from '@ionic-internal/component-api/v8/picker/custom-props.md';
import Slots from '@ionic-internal/component-api/v8/picker/slots.md';

<head>
  <title>ion-picker: Display a list of options in columns</title>
  <meta name="description" content="A Picker displays one or more columns with options for users to choose from." />
</head>

import EncapsulationPill from '@components/page/api/EncapsulationPill';

<EncapsulationPill type="shadow" />

A Picker displays one or more columns with options for users to choose from.

import Basic from '@site/static/usage/v8/picker/basic/index.md';

<Basic />

## Prefix & Suffix Content

Use the `prefix` and `suffix` slots to add additional content to the picker.

import PrefixSuffix from '@site/static/usage/v8/picker/prefix-suffix/index.md';

<PrefixSuffix />

## Theming

### CSS Variables

The picker highlight and fade can be customized using CSS variables on `ion-picker`. Developers can customize the individual appearance of `ion-picker-column-options` by targeting them directly and using host level styling.

import CSSProps from '@site/static/usage/v8/picker/theming/css-properties/index.md';

<CSSProps />

## Picker in Modal

Pickers can be displayed inside of overlays, such as `ion-modal` to create a picker experience with confirmation or cancellation buttons.

import ModalExample from '@site/static/usage/v8/picker/modal/index.md';

<ModalExample />
  
## Migrating from the Legacy Picker

The new picker syntax brings many improvements such as better performance and the ability to render a picker inline with your page content. It also allows developers to write the picker columns and column options directly in their template. As part of this, developers gain the ability to conditionally render columns/options, dynamically add columns/options, and more!

The new picker syntax is found in a separate component, so developers can continue to use the legacy picker if they wish.

Use the following steps to migrate from `ion-picker-legacy` to `ion-picker`.

### Updating Imports

1. Update any usages for `ion-picker-legacy` to `ion-picker`. This includes component usages in a template as well as component imports.

```diff
- import { IonPickerLegacy } from '@ionic/react';
+ import { IonPicker } from '@ionic/react';
```

```diff
- <IonPickerLegacy ...></IonPickerLegacy>
+ <IonPicker ...></IonPicker>
```

### Migrating Picker

The following table shows how each API for `ion-picker-legacy` maps to the new `ion-picker`.

**Properties**

Note: A majority of the properties here relate to overlays and not the picker itself. As a result, much of the functionality here is duplicated by a modal or a popover.

| Name | Alternative |
| - | - |
| `mode` | No change. |
| `buttons` | See [the Picker in a Modal example](#picker-in-modal) |
| `columns` | See [Adding Columns](#adding-columns) |
| `cssClass` | Use the `class` attribute (or `className` if you are using React). |
| `duration` | Use a `setTimeout` to dismiss the modal that presents the picker. See [the Picker in a Modal example](#picker-in-modal) for how to show a picker in a modal. Note: We do not recommend using this as the duration may not give users enough time to select an option. |
| `enterAnimation` | Use the property of the same name on a modal or a popover if using the picker in an overlay. |
| `leaveAnimation` | Use the property of the same name on a modal or a popover if using the picker in an overlay. |
| `htmlAttributes` | Set the attributes directly on `ion-picker`. |
| `isOpen` | Use the property of the same name on a modal or a popover if using the picker in an overlay. |
| `keyboardClose` | Use the property of the same name on a modal or a popover if using the picker in an overlay. |
| `animated` | Use the property of the same name on a modal or a popover if using the picker in an overlay. |
| `backdropDismiss` | Use the property of the same name on a modal or a popover if using the picker in an overlay. |
| `showBackdrop` | Use the property of the same name on a modal or a popover if using the picker in an overlay. |
| `trigger` | Use the property of the same name on a modal or a popover if using the picker in an overlay. |

### Adding Columns

2. Remove the `columns` property in favor of using the [ion-picker-column](./picker-column) component. Any options within each column can be rendered using the [ion-picker-column-option](./picker-column-option) component.

The following table shows how each key in [legacy PickerColumn interface](./picker-legacy#pickercolumn) maps to the new [ion-picker-column](./picker-column).

| `PickerColumn` Key | `ion-picker-column` Equivalent |
| - | - |
| `name` | Not needed. |
| `align` | Use CSS to change the alignent of each `ion-picker-column`. However, the new picker has additional logic to correctly position each column within the picker, so most developers will not need to change anything. |
| `selectedIndex` | Use the `value` property. |
| `prevSelected` | Not needed. This was only used for internal record-keeping. |
| `prefix` | Use the [`prefix` slot](#prefix--suffix-content). |
| `suffix` | Use the [`suffix` slot](#prefix--suffix-content). |
| `options` | Use `ion-picker-column-option` inside of `ion-picker-column. |
| `cssClass` | Use the `class` attribute (or `className` if you are using React). | 
| `columnWidth` | Use CSS and target `ion-picker-column` to change its width. |
| `prefixWidth` | Use CSS and target the content in the `prefix` slot to change its width. |
| `suffixWidth` | Use CSS and target the content in the `suffix` slot to change its width. |
| `options` | Use CSS and target `ion-picker-column-option` to change its width. |

### Adding Options

## Properties
<Props />

## Events
<Events />

## Methods
<Methods />

## CSS Shadow Parts
<Parts />

## CSS Custom Properties
<CustomProps />

## Slots
<Slots />
