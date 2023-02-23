# [ADA-UI - UI for Automated Damage Assessment](https://ada.510.global/)

This code repository contains the user interface (UI) for the Automated Damage Assessment (ADA) project.

The UI visualizes the data provided by [ADA-API](https://github.com/rodekruis/ADA-API) on a map view.

A disaster manager can interpret information from the data visualized on the map to consider in their disaster response activities.

## Frequently Asked Questions

### Event

<details>
  <summary>What is an <b>Event</b>?</summary>
  <ul><li>An <b>Event</b> refers to a disaster event anywhere in the world. An event can be caused by conflicts, accidents, or nature. Event information can be <b>Restricted</b> (protected by an <b>Event Access Code</b>) or <b>Public</b> (accessible to anyone). An event is identified by an <b>Event Marker</b> on the <a href="https://ada.510.global/events">World View</a> map.</li></ul>
</details>

<details>
  <summary>How do I view an <b>Event</b>?</summary>
  <ul>
  <li>Click on the <b>Event Marker</b> to open the <b>Event Popup</b>.</li>
  <li>If the <b>Event</b> is <b>Public</b>, the <b>View Event</b> button will be clickable.</li>
  <li>If the <b>Event</b> is <b>Restricted</b>, type in the <b>Event Access Code</b>.</li>
  <li>Click on the <b>View Event</b> button.</li>
  <li>The application will show the <b>Event View</b> map.</li>
  </ul>
</details>

<details>
  <summary>How do I change the numbers of <b>People Affected</b>, <b>People Affected in Percentage</b>, <b>Building Damage</b>, and <b>Building Damage in Percentage</b> for an <b>Event</b>?</summary>
  <ul>
  <li>If you refer to the <b>Total Statistics</b> on the left side of the application which are shown under the <b>About ADA</b>, <b>User Guide</b>, and <b>Disclaimer</b> buttons,</li>
  <ul>
  <li>These numbers are from <code><a href="https://ada.510.global/api/swagger/#/event/EventController_findOne">GET /api/events/{id}</a></code>.</li>
  <li>To change these numbers, use <code><a href="https://ada.510.global/api/swagger/#/event/EventController_update">PATCH /api/events/{id}</a></code>.</li>
  </ul>
  <li>If you refer to the <b>Admin Level Statistics</b> on the map of the application which are shown in the admin area popups,</li>
  <ul>
  <li>These numbers are from <code><a href="https://ada.510.global/api/swagger/#/event-layer/EventController_readLayer">GET /api/events/{id}/layer/{name}</a></code>.</li>
  <li>To change these numbers, use <code><a href="https://ada.510.global/api/swagger/#/event-layer/EventController_createLayer">POST /api/events/{id}/layer/{name}</a></code>.</li>
  </ul>
  </ul>
</details>

### Event Layer

<details>
  <summary>What is an <b>Event Layer</b>?</summary>
  <ul>
  <li>An <b>Event Layer</b> is <a href="https://geojson.org/">GeoJSON</a> information of an <b>Event</b> which can be visualized on the <b>Event View</b> map.</li>
  <li>Examples of event layers are administrative boundaries, wealth index, population density, assessment area, building and building damage.</li>
  <li>An event layer can contain extra support information to be shown in information popups.</li>
  </ul>
</details>

<details>
  <summary>How to change the GeoJSON data visualized for an <b>Event Layer</b>?</summary>
  <ul>
  <li>This data is from <code>geojson</code> of <code><a href="https://ada.510.global/api/swagger/#/event-layer/EventController_readLayer">GET /api/events/{id}/layer/{name}</a></code>.</li>
  <li>An example of a valid GeoJSON for administrative boundaries is,

```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "people_affected": 6789,
                "people_affected_percentage": 0.23,
                "building_damage": 123,
                "building_damage_percentage": 0.45
            },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [95, 216],
                            [241, 253],
                            [175, 138],
                            [95, 216]
                        ]
                    ]
                ]
            }
        }
    ]
}
```

  </li>
  <li>Note that <code>properties</code> contain the keys <code>people_affected</code>, <code>people_affected_percentage</code>, <code>building_damage</code>, and <code>building_damage_percentage</code>. These numbers are shown in the admin area popup and are used to shade the admin areas.</li>
  <li>To change this data update <code>geojson</code> using <code><a href="https://ada.510.global/api/swagger/#/event-layer/EventController_createLayer">POST /api/events/{id}/layer/{name}</a></code>.</li>
  </ul>
</details>

<details>
  <summary>How to change the popup information text for the <b>Event Layers</b>?</summary>
  <ul>
  <li>This data is from <code>information</code> of <code><a href="https://ada.510.global/api/swagger/#/event-layer/EventController_readLayer">GET /api/events/{id}/layer/{name}</a></code>.</li>
  <li>The value for <code>information</code> can be plain string or <a href="https://www.markdownguide.org/cheat-sheet/">Markdown</a>.</li>
  <li>To change this data update <code>information</code> using <code><a href="https://ada.510.global/api/swagger/#/event-layer/EventController_createLayer">POST /api/events/{id}/layer/{name}</a></code>.</li>
  <li>NOTE: <code>information</code> for administrative boundary event layers are not used in ADA-UI.</li>
  </ul>
</details>

<details>
  <summary>How do I change the legend for the visualized <b>Event Layers</b>?</summary>
  <ul>
  <li>A legend is shown for each <b>Event Layer</b> visualized on the <b>Event View</b> map.</li>
  <li>Event Layers assessment area, wealth index, and population density have pre-defined static legends.</li>
  <li>Event Layers with buildings are also static but are grouped together for better readability.</li>
  <li>Event Layers that show admin level properties are calculated using <code>properties</code> in their <code>geojson</code> values.</li>
  <li>The following assumptions are taken to generate legible legends,</li>
  <ul>
  <li>Minimum value is 0.</li>
  <li>Maximum value is the largest property value found in <code>geojson</code>. The lowest possible maximum value is programmatically restricted to 1.</li>
  <li>5 linearly divided categories are generated using the maximum value. For example, a maximum value of <b>2</b> will generate the categories, <code>[ 0 - 0.4, 0.4 - 0.8, 0.8 - 1.2, 1.2 - 1.6, 1.6+ ]</code>.</li>
  </ul>
  </ul>
</details>

<details>
  <summary>Why do I not see any data on the map for an <b>Event Layer</b>?</summary>
  <ol>
  <li>Check if the geojson uploaded for the <b>Event Layer</b> is a valid geojson.</li>
  <li>Check if the geojson features is a not empty array.</li>
  <li>Check if the geojson features contain the property names used by the UI,</li>
  <ul>
  <li>Event Layers <code>admin-{n}</code> use <code>people_affected</code>, <code>people_affected_percentage</code>, <code>building_damage</code>, and <code>building_damage_percentage</code></li>
  <li>Event Layer <code>wealth-index</code> uses <code>rwi</code></li>
  <li>Event Layer <code>population-density</code> uses <code>population_density</code></li>
  </ul>
  <li>Check if the geojson features contain valid values for the property names.</li>
  </ol>
</details>

### Miscellaneous

<details>
  <summary>How to change the popup information text for the <b>About ADA</b>, <b>User Guide</b>, and <b>Disclaimer</b> buttons?</summary>
  <ul>
  <li>The information shown in these popups are from markdown assets within this repository.</li>
  <li>They are stored in <code><a href="https://github.com/rodekruis/ADA-UI/tree/main/src/assets/markdown">src/assets/markdown</a></code> directory.</li>
  <li>Change the content of these assets and rebuild the ADA-UI to effect any changes. A merge into <a href=https://github.com/rodekruis/ADA-UI/tree/main">main</a> branch with commit prefix <code>feat</code> or <code>fix</code> will trigger a rebuild via continuous deployment.</li>
  </ul>
</details>

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run e2e
```

## License

This project is open source under the [MIT LICENSE](./LICENSE).

## Support

Write to us at [support@510.global](mailto:support@510.global).
