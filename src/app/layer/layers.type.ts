export class Layer {
  label: string;
  name: string;
  image: string;
  information: string;
  geojson?: GeoJSON.FeatureCollection;
  active?: boolean;
}
