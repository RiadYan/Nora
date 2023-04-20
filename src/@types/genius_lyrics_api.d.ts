// Generated by https://quicktype.io

export interface GeniusLyricsAPI {
  meta: Meta;
  response: SearchResponse;
}

export interface Meta {
  status: number;
  message?: string;
}

export interface SearchResponse {
  hits: Hit[];
}

export interface Hit {
  highlights: unknown[];
  index: string;
  type: string;
  result: Result;
}

export interface Result {
  annotation_count: number;
  api_path: string;
  artist_names: string;
  full_title: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: number;
  language: null | string;
  lyrics_owner_id: number;
  lyrics_state: string;
  path: string;
  pyongs_count: number | null;
  relationships_index_url: string;
  release_date_components: ReleaseDateComponents | null;
  release_date_for_display: null | string;
  song_art_image_thumbnail_url: string;
  song_art_image_url: string;
  stats: GeniusStats;
  title: string;
  title_with_featured: string;
  url: string;
  featured_artists: GeniusArtist[];
  primary_artist: GeniusArtist;
}

export interface GeniusArtist {
  api_path: string;
  header_image_url: string;
  id: number;
  image_url: string;
  is_meme_verified: boolean;
  is_verified: boolean;
  name: string;
  url: string;
  iq?: number;
}

export interface ReleaseDateComponents {
  year: number;
  month: number;
  day: number;
}

export interface GeniusStats {
  unreviewed_annotations: number;
  hot: boolean;
  pageviews?: number;
}

// Generated by https://quicktype.io

export interface GeniusSongMetadataResponse {
  meta: Meta;
  response: ResultResponse;
}

interface ResultResponse {
  song: ResponseSong;
}

interface ResponseSong {
  annotation_count: number;
  api_path: string;
  apple_music_id: string;
  apple_music_player_url: string;
  artist_names: string;
  description: Description;
  embed_content: string;
  featured_video: boolean;
  full_title: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: number;
  language: string;
  lyrics_owner_id: number;
  lyrics_placeholder_reason: null;
  lyrics_state: string;
  path: string;
  pyongs_count: number;
  recording_location: string;
  relationships_index_url: string;
  release_date: string;
  release_date_for_display: string;
  song_art_image_thumbnail_url: string;
  song_art_image_url: string;
  stats: FluffyStats;
  title: string;
  title_with_featured: string;
  url: string;
  current_user_metadata: SongCurrentUserMetadata;
  album: Album;
  custom_performances: CustomPerformance[];
  description_annotation: DescriptionAnnotation;
  featured_artists: GeniusArtist[];
  lyrics_marked_complete_by: null;
  lyrics_marked_staff_approved_by: null;
  media: Media[];
  primary_artist: GeniusArtist;
  producer_artists: GeniusArtist[];
  song_relationships: SongRelationship[];
  verified_annotations_by: unknown[];
  verified_contributors: unknown[];
  verified_lyrics_by: unknown[];
  writer_artists: GeniusArtist[];
}

interface Album {
  api_path: string;
  cover_art_url: string;
  full_title: string;
  id: number;
  name: string;
  url: string;
  artist: GeniusArtist;
}

interface SongCurrentUserMetadata {
  permissions: string[];
  excluded_permissions: string[];
  interactions: PurpleInteractions;
  relationships: IqByAction;
  iq_by_action: IqByAction;
}

interface PurpleInteractions {
  pyong: boolean;
  following: boolean;
}

interface IqByAction {}

interface CustomPerformance {
  label: string;
  artists: GeniusArtist[];
}

interface Description {
  dom: DescriptionDOM;
}

interface DescriptionDOM {
  tag: string;
  children: Child[];
}

interface Child {
  tag: string;
  children: string[];
}

interface DescriptionAnnotation {
  _type: string;
  annotator_id: number;
  annotator_login: string;
  api_path: string;
  classification: string;
  fragment: string;
  id: number;
  is_description: boolean;
  path: string;
  range: Range;
  song_id: number;
  url: string;
  verified_annotator_ids: unknown[];
  annotatable: Annotatable;
  annotations: Annotation[];
}

interface Annotatable {
  api_path: string;
  client_timestamps: ClientTimestamps;
  context: string;
  id: number;
  image_url: string;
  link_title: string;
  title: string;
  type: string;
  url: string;
}

interface ClientTimestamps {
  updated_by_human_at: number;
  lyrics_updated_at: number;
}

interface Annotation {
  api_path: string;
  body: Body;
  comment_count: number;
  community: boolean;
  custom_preview: null;
  has_voters: boolean;
  id: number;
  pinned: boolean;
  share_url: string;
  source: null;
  state: string;
  url: string;
  verified: boolean;
  votes_total: number;
  current_user_metadata: AnnotationCurrentUserMetadata;
  authors: Author[];
  cosigned_by: unknown[];
  rejection_comment: null;
  verified_by: null;
}

interface Author {
  attribution: number;
  pinned_role: null;
  user: User;
}

interface User {
  api_path: string;
  avatar: Avatar;
  header_image_url: string;
  human_readable_role_for_display: string;
  id: number;
  iq: number;
  login: string;
  name: string;
  role_for_display: string;
  url: string;
  current_user_metadata: UserCurrentUserMetadata;
}

interface Avatar {
  tiny: Medium;
  thumb: Medium;
  small: Medium;
  medium: Medium;
}

interface Medium {
  url: string;
  bounding_box: BoundingBox;
}

interface BoundingBox {
  width: number;
  height: number;
}

interface UserCurrentUserMetadata {
  permissions: unknown[];
  excluded_permissions: string[];
  interactions: FluffyInteractions;
}

interface FluffyInteractions {
  following: boolean;
}

interface Body {
  dom: BodyDOM;
}

interface BodyDOM {
  tag: string;
}

interface AnnotationCurrentUserMetadata {
  permissions: unknown[];
  excluded_permissions: string[];
  interactions: TentacledInteractions;
  iq_by_action: IqByAction;
}

interface TentacledInteractions {
  cosign: boolean;
  pyong: boolean;
  vote: null;
}

interface Range {
  content: string;
}

interface Media {
  attribution?: string;
  provider: string;
  type: string;
  url: string;
  start?: number;
}

interface SongRelationship {
  relationship_type: string;
  type: string;
  songs: SongElement[];
}

interface SongElement {
  annotation_count: number;
  api_path: string;
  artist_names: string;
  full_title: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: number;
  language: string;
  lyrics_owner_id: number;
  lyrics_state: string;
  path: string;
  pyongs_count: null;
  relationships_index_url: string;
  release_date_components: ReleaseDateComponents;
  release_date_for_display: string;
  song_art_image_thumbnail_url: string;
  song_art_image_url: string;
  stats: PurpleStats;
  title: string;
  title_with_featured: string;
  url: string;
  featured_artists: GeniusArtist[];
  primary_artist: GeniusArtist;
}

interface PurpleStats {
  unreviewed_annotations: number;
  hot: boolean;
}

interface FluffyStats {
  accepted_annotations: number;
  contributors: number;
  iq_earners: number;
  transcribers: number;
  unreviewed_annotations: number;
  verified_annotations: number;
  hot: boolean;
  pageviews: number;
}
