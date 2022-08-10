export type CardType = {
  id: number,
  productImage: string,
  productName: string,
  productPrice: string,
  quantity: number,
}

export type CardsType = {
  products: Array<CardType>
}

export type TotalPrice = {
  [key: string]: number
}

