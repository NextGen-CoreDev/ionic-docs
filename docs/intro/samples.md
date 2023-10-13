---
title: Sample Apps
hide_table_of_contents: true
---

import DocsCard from '@components/global/DocsCard';
import DocsCards from '@components/global/DocsCards';

<head>
  <title>Sample Apps: Build an Ionic App</title>
  <meta name="description" content="Build a sample Ionic App step by step." />
  <style>{`
    :root {
      --doc-item-container-width: 60rem;
    }
  `}</style>
</head>

<intro-end />

<h2>Section 1</h2>
<h3>Blank Starter</h3>

Explore a blank starter.

Before proceeding, make sure you have installed the [Ionic CLI](/docs/cli) and all prerequisites. Start and run a blank app by running the following:

```shell
ionic start myApp blank --type=angular --capacitor
cd myApp
ionic serve
```

import BlankSample from '@site/static/samples/blank/index.md';

<BlankSample />
