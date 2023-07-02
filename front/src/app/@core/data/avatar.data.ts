export interface Avatar {
  pk?: number;
  name?: string;
  image?: Image;
  user?: number;
}

export interface Image {
  smallSquareCrop?: string;
  thumbnail?: string;
  fullSize?: string;
  mediumSquareCrop?: string;
}
