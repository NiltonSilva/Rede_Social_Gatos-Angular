export interface Animal {
  id: number,
  postDate: Date,
  url: string,
  descricao: string,
  allowComments: boolean,
  likes: number,
  comments: number,
  userId: number
}

export type Animais = Array<Animal>;
