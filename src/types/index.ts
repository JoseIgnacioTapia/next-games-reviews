export interface ImageData {
  id: number;
  attributes: {
    url: string;
  };
}

export interface GameAttributes {
  slug: string;
  title: string;
  subtitle: string;
  body: string;
  publishedAt: string; // Podrías considerar usar tipo Date si necesitas manipular fechas
  image: {
    data: ImageData;
  };
}

export interface Game {
  id?: number;
  attributes: GameAttributes;
}

export interface ReviewData {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  body?: string | Promise<string>;
}

// // Ejemplo de uso
// const gameData: Game = {
//   id: 8,
//   attributes: {
//     slug: "hades-2018",
//     title: "Hades",
//     subtitle: "A Rogue-Like Gem that Ascends to Greatness",
//     publishedAt: "2023-05-28T11:00:00.000Z",
//     image: {
//       data: {
//         id: 8,
//         attributes: {
//           url: "/uploads/hades_2018_bff8e28a82.jpg",
//         },
//       },
//     },
//   },
// };
