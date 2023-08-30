export interface Livemap {
  properties: {
    site_name: string;
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
  features: Livemap[];
}
