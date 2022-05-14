import { Reply } from "./reply";

export class Tweet {
    tweetId!: string;
    emailId!: string;
    message!: string;
    createdAt!: Date;
    likeCount!: number;
    replies!: Reply[];
}
