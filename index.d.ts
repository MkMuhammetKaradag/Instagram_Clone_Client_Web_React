import { PostType_2 } from "./src/api";

declare module "react-show-more-text";
declare module "react-video-thumbnail";
declare function useOutletContext<
  Context = {
    userPosts?: PostType_2[];
    postPage?: {
      postImage: string;
    };
  }
>(): Context;
