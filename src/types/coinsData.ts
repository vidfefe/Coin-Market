export interface CoinsData {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  marketCapUsd: string;
  changePercent24Hr: string;
}

export interface CoinDetails {
  id: string;
  changePercent24Hr: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  supply: string;
  maxSupply: string;
  rank: string;
}
