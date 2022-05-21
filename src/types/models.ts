export interface User {
  _id: string;
  email?: string | null;
  name?: string | null;
  avatar?: string | null;
  extra_details?: string | null;
  skills?: string | null;
  profession?: string | null;
  details?: string | null;
  dateCreated?: string | null;
}

export interface Post {
  _id: string;
  title?: string | null;
  fullText?: string | null;
  description?: string | null;
  dateCreated?: string | null;
  image?: string | null;
  likes?: Array<string>;
  postedBy?: string | null;
}

export interface Comment {
  _id: string;
  commentedBy?: string | null;
  followedCommentID?: string | null;
  postID?: string | null;
  text?: string | null;
  dateCreated?: string | null;
  likes?: Array<string>;
  followedArr?: Array<Comment>;
}
