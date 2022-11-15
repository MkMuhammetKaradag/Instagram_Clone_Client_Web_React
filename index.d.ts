import { PostType_2, PostUserType } from "./src/api";

declare module "react-show-more-text";
declare module "react-video-thumbnail";
declare function useOutletContext<
  Context = {
    userPosts?: PostType_2[];
    postPage?: {
      _id: string;
      postUrl: string;
      postType: string;
      postOwner: PostUserType;
    };
  }
>(): Context;
