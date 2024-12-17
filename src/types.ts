export type SurfSpot = {
    title: string,
    country:string,
    city:string,
    longitude:number,
    latitude:number,
    imageURL: string,
    id:number,
  };

export type SurfSpots = SurfSpot[];

// export type SpotCarouselInfo = Pick<SurfSpot, 'title' | 'imageURL' | 'country' | 'city' | 'longitude' | 'latitude'>;

// export type SpotCarouselInfos = SpotCarouselInfo[];

export type CountryInfo = {
    country:string,
    continent:string,
}

export type FollowInfo = {
  currentUsername:string,
  usernameToFollow:string,
}

export type FollowInfos = FollowInfo[];

export type AccountInfo = {
  id:                number,
  email:             string,
  username:          string,
  password:          string,
  firstname:         string,
  lastname:          string,
  nationality:       string,
  followedUsers:     string[],
  profilePictureCID: string,
}

export type AccountInfos = AccountInfo[];

// export type ResponsiveCarouselProps = {
//     spotCarouselInfos: SpotCarouselInfos;
//   }
