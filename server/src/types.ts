export interface Data {
  '?xml': XML;
  MediaContainer: MediaContainer | IDMediaContainer;
}

export interface XML {
  version: string;
  encoding: string;
}

export interface MediaContainer {
  Video: Video[];
  size: string;
  allowSync: string;
  art: string;
  identifier: string;
  librarySectionID: string;
  librarySectionTitle: string;
  librarySectionUUID: string;
  mediaTagPrefix: string;
  mediaTagVersion: string;
  thumb: string;
  title1: string;
  title2: string;
  viewGroup: ViewGroup;
  viewMode: string;
}

export interface IDMediaContainer {
  size: string;
  claimed: string;
  machineIdentifier: string;
  version: string;
}

export interface Video {
  Media: MediaElement[] | MediaElement;
  Genre?: Collection[] | Collection;
  Country?: Collection[] | Collection;
  Director?: Collection[] | Collection;
  Writer?: Collection[] | Collection;
  Role: Collection[];
  ratingKey: string;
  key: string;
  guid: string;
  slug?: string;
  studio: string;
  type: ViewGroup;
  title: string;
  contentRating: ContentRating;
  summary: string;
  rating?: string;
  audienceRating: string;
  skipCount?: string;
  year: string;
  tagline?: string;
  thumb: string;
  art?: string;
  duration: string;
  originallyAvailableAt: string;
  addedAt: string;
  updatedAt: string;
  audienceRatingImage: AudienceRatingImage;
  chapterSource: ChapterSource;
  primaryExtraKey?: string;
  ratingImage?: RatingImage;
  viewCount?: string;
  lastViewedAt?: string;
  Collection?: Collection;
  titleSort?: string;
  userRating?: string;
  lastRatedAt?: string;
  originalTitle?: string;
}

export interface Collection {
  tag: string;
}

export interface MediaElement {
  Part: Part;
  id: string;
  duration: string;
  bitrate: string;
  width: string;
  height: string;
  aspectRatio: string;
  audioChannels: string;
  audioCodec: AudioCodec;
  videoCodec: VideoCodec;
  videoResolution: string;
  container: Container;
  videoFrameRate: VideoFrameRate;
  videoProfile: VideoProfile;
  audioProfile?: AudioProfile;
}

export interface Part {
  id: string;
  key: string;
  duration: string;
  file: string;
  size: string;
  container: Container;
  indexes?: Indexes;
  videoProfile: VideoProfile;
  audioProfile?: AudioProfile;
}

export enum AudioProfile {
  Dts = 'dts',
  Es = 'es',
  Hra = 'hra',
  Ma = 'ma',
  PCMS16LE = 'pcm_s16le',
  PCMS24LE = 'pcm_s24le',
}

export enum Container {
  Mkv = 'mkv',
}

export enum Indexes {
  SD = 'sd',
}

export enum VideoProfile {
  Advanced = 'advanced',
  High = 'high',
  Main = 'main',
  Main10 = 'main 10',
}

export enum AudioCodec {
  Ac3 = 'ac3',
  Dca = 'dca',
  DcaMa = 'dca-ma',
  PCM = 'pcm',
  Truehd = 'truehd',
}

export enum VideoCodec {
  H264 = 'h264',
  Hevc = 'hevc',
  Mpeg2Video = 'mpeg2video',
  Vc1 = 'vc1',
}

export enum VideoFrameRate {
  The24P = '24p',
  The60P = '60p',
}

export enum AudienceRatingImage {
  ImdbImageRating = 'imdb://image.rating',
  RottentomatoesImageRatingSpilled = 'rottentomatoes://image.rating.spilled',
  RottentomatoesImageRatingUpright = 'rottentomatoes://image.rating.upright',
}

export enum ChapterSource {
  Media = 'media',
}

export enum ContentRating {
  G = 'G',
  NotRated = 'Not Rated',
  PG = 'PG',
  PG13 = 'PG-13',
  R = 'R',
}

export enum RatingImage {
  RottentomatoesImageRatingRipe = 'rottentomatoes://image.rating.ripe',
  RottentomatoesImageRatingRotten = 'rottentomatoes://image.rating.rotten',
}

export enum ViewGroup {
  Movie = 'movie',
}
