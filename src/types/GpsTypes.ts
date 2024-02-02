export type SuggestionType = {
  label: string;
  postcode: string;
  city: string;
  coordinates: [number, number];
};

export type FeatureType = {
  properties: {
    postcode: string;
    city: string;
  };
  geometry: {
    coordinates: [number, number];
  };
};
