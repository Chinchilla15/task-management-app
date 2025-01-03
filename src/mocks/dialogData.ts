import { PointEstimate, TaskTag } from "@/graphql/graphql";

export const pointEstimateOptions = [
  { value: PointEstimate.Zero, label: "0 points" },
  { value: PointEstimate.One, label: "1 point" },
  { value: PointEstimate.Two, label: "2 points" },
  { value: PointEstimate.Four, label: "4 points" },
  { value: PointEstimate.Eight, label: "8 points" },
] as const;

export const tagOptions = [
  { value: TaskTag.Android, label: "ANDROID" },
  { value: TaskTag.Ios, label: "IOS" },
  { value: TaskTag.NodeJs, label: "NODE_JS" },
  { value: TaskTag.Rails, label: "RAILS" },
  { value: TaskTag.React, label: "REACT" },
] as const;

export const ASSIGNEE_OPTIONS = [
  { value: "user1", label: "Daniel Alessandro Chinchilla" },
  { value: "user2", label: "User 2" },
  { value: "user3", label: "User 3" },
];

export const LABEL_OPTIONS = [
  { value: "ios", label: "iOS App" },
  { value: "android", label: "Android" },
  { value: "web", label: "Web" },
];
