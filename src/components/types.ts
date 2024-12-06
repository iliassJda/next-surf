export type SurfSpot = {
    title: true,
    country:true,
    city:true,
    longitude:true,
    latitude:true,
    imageURL: true,
    id:true,
  };

export type SurfSpots = SurfSpot[];

// export type SpotCarouselInfo = Pick<SurfSpot, 'title' | 'imageURL' | 'country' | 'city' | 'longitude' | 'latitude'>;

// export type SpotCarouselInfos = SpotCarouselInfo[];

export type CountryInfo = {
    country:string,
    continent:string,
}

// export type ResponsiveCarouselProps = {
//     spotCarouselInfos: SpotCarouselInfos;
//   }
