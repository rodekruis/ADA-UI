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
  <summary>How do I change the numbers of <b>People Affected</b>, <b>Damaged Buildings</b>, and <b>Damaged Buildings in Percentage</b> for an <b>Event</b>?</summary>
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

### Map Layer

<details>
  <summary>What is a <b>Map Layer</b>?</summary>
  <ul>
  <li>A <b>Map Layer</b> is <a href="https://geojson.org/">GeoJSON</a> information of an <b>Event</b> which can be visualized on the <b>Event View</b> map.</li>
  <li>Examples of map layers are administrative boundaries, wealth index, population density, assessment area, building and building damage.</li>
  <li>A map layer can contain extra support information to be shown in information popups.</li>
  </ul>
</details>

<details>
  <summary>How to change the GeoJSON data visualized for a <b>Map Layer</b>?</summary>
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
                "building_damage": 123,
                "building_damage_percentage": 0.45,
                "people_affected": 6789
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
  <li>Note that <code>properties</code> contain the keys <code>building_damage</code>, <code>building_damage_percentage</code>, and <code>people_affected</code>. These numbers are shown in the admin area popup and are used to shade the admin areas.</li>
  <li>To change this data update <code>geojson</code> using <code><a href="https://ada.510.global/api/swagger/#/event-layer/EventController_createLayer">POST /api/events/{id}/layer/{name}</a></code>.</li>
  </ul>
</details>

<details>
  <summary>How to change the popup information text for the <b>Map Layers</b>?</summary>
  <ul><li>This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can’t cover every edge case, so if you need more information about any of these elements, refer to the reference guides</li></ul>
</details>

<details>
  <summary>How do I change the legend for the visualized <b>Map Layers</b>?</summary>
  <ul><li>This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can’t cover every edge case, so if you need more information about any of these elements, refer to the reference guides</li></ul>
</details>

### Miscellaneous

<details>
  <summary>How to change the popup information text for the <b>About ADA</b>, <b>User Guide</b>, and <b>Disclaimer</b> buttons?</summary>
  <ul><li>This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can’t cover every edge case, so if you need more information about any of these elements, refer to the reference guides</li></ul>
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
