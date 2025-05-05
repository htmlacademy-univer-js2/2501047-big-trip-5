import { getRandomArrayElement } from "../utils.js";
import { TYPE } from "../const.js";

const mockEvents = [
  {
    type: 1,
    city: "Amsterdam",
    dateStart: new Date("2025-03-18T10:30:00"), // дата + время начала
    dateEnd: new Date("2025-03-18T11:00:00"), // дата + время конца
    price: 20,
    offers: [
      {
        name: "Order Uber",
        price: 20,
        isSelected: true,
      },
      {
        name: "Add luggage",
        price: 50,
        isSelected: false,
      },
    ],
    favorite: true,
    destination: {
      text: "Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.",
      imgs: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    },
  },
  {
    type: 2,
    city: "Chamonix",
    dateStart: new Date("2025-03-18T12:25:00"), // дата + время начала
    dateEnd: new Date("2025-03-18T13:35:00"), // дата + время конца
    price: 160,
    offers: [
      {
        name: "Add luggage",
        price: 50,
        isSelected: true,
      },
      {
        name: "Switch to comfort",
        price: 80,
        isSelected: true,
      },
    ],
    favorite: true,
    destination: {
      text: "Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.",
      imgs: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    },
  },
  {
    type: 3,
    city: "Chamonix",
    dateStart: new Date("2025-03-18T14:20:00"), // дата + время начала
    dateEnd: new Date("2025-03-18T15:00:00"), // дата + время конца
    price: 50,
    offers: [
      {
        name: "Book tickets",
        price: 40,
        isSelected: true,
      },
      {
        name: "Lunch in city",
        price: 30,
        isSelected: true,
      },
    ],
    favorite: true,
    destination: {
      text: "Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.",
      imgs: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    },
  },
];
