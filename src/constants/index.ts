import { img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11 } from '../assets';

export type Image = {
  id: string;
  image: string;
  featured?: boolean;
};

export const allImages: Image[] = [
  { id: '1', image: img1 },
  { id: '2', image: img2 },
  { id: '3', image: img3 },
  { id: '4', image: img4 },
  { id: '5', image: img5 },
  { id: '6', image: img6 },
  { id: '7', image: img7 },
  { id: '8', image: img8 },
  { id: '9', image: img9 },
  { id: '10', image: img10, featured: true },
  { id: '11', image: img11 },
];
