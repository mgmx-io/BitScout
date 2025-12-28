export type Wallet = {
  id: string;
  name: string;
};

export type Address = {
  id: string;
  walletId: string;
  address: string;
};
