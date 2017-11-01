export interface Clickable {
  onClick: g.Trigger<void>;
}

export type Button = g.E & Clickable;
