import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/home": {};
  "/providers": {};
  "/providers-enhanced": {};
  "/provider/:id": {
    "id": string;
  };
};