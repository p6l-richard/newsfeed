export const FELLOWSHIP_ENUM = {
  founders: "founders",
  angels: "angels",
  writers: "writers",
  all: "all",
} as const;

export const FELLOWSHIPS = ["founders", "angels", "writers", "all"] as const;

export type FellowshipUnion = typeof FELLOWSHIPS[number];
