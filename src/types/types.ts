export type AlertHandle = {
  show: (message: string, type?: "success" | "error") => void;
  hide: () => void;
};