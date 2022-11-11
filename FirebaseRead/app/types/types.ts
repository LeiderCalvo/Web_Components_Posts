export interface Post {
  title: string;
  body: string;
  img: string;
}

export interface FirePostResponse {
  data: () => Post;
}

export interface FireCollectionResponse<T> {
  docs: T[];
}
