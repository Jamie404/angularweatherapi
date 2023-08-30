export interface Live {
  geometry: {
    coordinates: {
      length: any;
      lat: any;
      long: any;
    };
  };
  properties: {
    lat: any;
    long: any;
    site_name: any;
    camera_image: any;
    air_temperature: number;
    wind_speed: number;
    road_surface_temperature: number;
    wind_direction_bearing: any;
    weather_description: string;
    weather_definition: string;
  };
}

export interface WeatherFeatures {
  features: Live[];
}
