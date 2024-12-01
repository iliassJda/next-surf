export type SurfSpot = {
    title: string;
    country: string;
    imageURL: string;
    id: number;
  };

export type SurfSpots = SurfSpot[];

export type SpotCarouselInfo = Pick<SurfSpot, 'title' | 'imageURL'>;

export type SpotCarouselInfos = SpotCarouselInfo[];

export type CountryInfo = {
    country:string,
    continent:string
}

// export type ResponsiveCarouselProps = {
//     spotCarouselInfos: SpotCarouselInfos;
//   }
