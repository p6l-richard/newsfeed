import type { FellowshipUnion } from "graphql/data-models";

export const NEWS_TYPES = ["announcement", "user", "project"] as const;

export const NEWS_TYPE_ENUM = {
  announcement: "announcement",
  user: "user",
  project: "project",
} as const;

export type NewsTypeUnion = typeof NEWS_TYPES[number];

export type NewsPieceRow = {
  id: number;
  news_type: NewsTypeUnion;
  title: string;
  description: string;
  img_url: string;
  fellowship: Exclude<FellowshipUnion, "all">;
  created: Date;
};
