export type CurrentUser = {
  sub: number;
  role: string;
  username: string;
  exp: number;
};

export type RawJwtPayload = {
  sub: string;
  role: string;
  username: string;
  exp: number;
};
