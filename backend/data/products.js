const products = [
  {
    name: "Double BBQ Beefacon",
    image:
      "https://www.burgerking.com.my/upload/image/Product/14/BBQ%20Beefacon%20%28Double%29%20Ala%20Carte.png",
    description:
      "A double layer of flame-grilled beef patties topped with smoky beef bacon, fresh vegetables, and tangy BBQ sauce on a toasted sesame bun.",
    price: 6.99,
    rating: 4.5,
    numReviews: 12,
    availability: true,
    category: "burger",
  },
  {
    name: "Single Mushroom Swiss",
    image:
      "https://www.burgerking.com.my/upload/image/Product/11/BBQ%20Mushroom%20Swiss%20%28Single%29%20Ala%20Carte.png",
    description:
      "Juicy grilled beef patty smothered in melted Swiss cheese and sautéed mushrooms, served on a soft bun with creamy sauce.",
    price: 5.49,
    rating: 4.8,
    numReviews: 95,
    availability: true,
    category: "burger",
  },
  {
    name: "Double Cheeseburger",
    image:
      "https://www.burgerking.com.my/upload/image/Product/56/Cheeseburger%20%28Double%29%20Ala%20Carte.png",
    description:
      "Two flame-grilled beef patties stacked with layers of melty American cheese, pickles, ketchup, and mustard on a sesame bun.",
    price: 4.99,
    rating: 4.3,
    numReviews: 78,
    availability: true,
    category: "burger",
  },
  {
    name: "Angus Mushroom Burger",
    image:
      "https://www.burgerking.com.my/upload/image/Product/161/0-Mushroom%20Angus.png",
    description:
      "Premium Angus beef patty topped with Swiss cheese, savory mushrooms, and garlic aioli, all nestled in a gourmet bun.",
    price: 7.29,
    rating: 4.3,
    numReviews: 78,
    availability: true,
    category: "burger",
  },
  {
    name: "Fish'N Crisp",
    image:
      "https://www.burgerking.com.my/upload/image/Product/39/Fish%20N%20Crisp%20Ala%20Carte.png",
    description:
      "Crispy golden fish fillet with creamy tartar sauce and lettuce, served on a warm toasted bun.",
    price: 4.79,
    rating: 4.3,
    numReviews: 78,
    availability: true,
    category: "burger",
  },
  {
    name: "Beef Croissan'wich® with Egg",
    image:
      "https://www.burgerking.com.my/upload/image/Product/135/0-Beef%20Ala%20Carte.png",
    description:
      "Savory beef sausage layered with a fluffy egg and melted cheese on a buttery croissant bun — the perfect breakfast choice.",
    price: 4.59,
    rating: 4.3,
    numReviews: 78,
    availability: true,
    category: "burger",
  },
  {
    name: "Long Cheesy Onion Beef",
    image:
      "https://www.burgerking.com.my/upload/image/Product/116/Cheesy%20Onion%20Long%20Beef%20Ala%20Carte.png",
    description:
      "Long beef patty topped with rich cheese sauce, crispy onion rings, and smoky BBQ sauce in a soft hoagie-style bun.",
    price: 6.49,
    rating: 4.3,
    numReviews: 78,
    availability: true,
    category: "burger",
  },
  {
    name: "Angus Signature Burger",
    image:
      "https://www.burgerking.com.my/upload/image/Product/160/0-Signature%20Angus.png",
    description:
      "A gourmet Angus beef burger with sharp cheddar, caramelized onions, pickles, and zesty signature sauce on a brioche bun.",
    price: 7.99,
    rating: 4.0,
    numReviews: 65,
    availability: true,
    category: "burger",
  },
  {
    name: "Fully Loaded Croissant with Egg",
    image:
      "https://www.burgerking.com.my/upload/image/Product/104/0-J1004668_BREAKFAST%20WITH%20CROISSAN%27WICH%20%28FEB%2724%29%20-%20HOME%20DELIVERY%20SKU_Fully%20%20Loaded.png",
    description:
      "A breakfast croissant packed with egg, beef sausage, smoked bacon, and melted cheese — hearty and satisfying.",
    price: 5.99,
    rating: 4.7,
    numReviews: 110,
    availability: true,
    category: "burger",
  },
  {
    name: "Whopper",
    image:
      "https://www.burgerking.com.my/upload/image/Product/8/Whopper%20Ala%20Carte.png",
    description:
      "The iconic flame-grilled beef patty with tomatoes, lettuce, pickles, onions, ketchup, and mayo on a toasted sesame bun.",
    price: 5.99,
    rating: 4.6,
    numReviews: 89,
    availability: false,
    category: "burger",
  },
  {
    name: "Triple Whopper Jr with Cheese",
    image:
      "https://www.burgerking.com.my/upload/image/Product/126/Triple%20Whopper%20Junior%20with%20Cheese%20Ala%20Carte.png",
    description:
      "Three junior beef patties stacked high with American cheese, fresh veggies, and tangy sauces on a sesame bun.",
    price: 7.59,
    rating: 4.9,
    numReviews: 15,
    availability: true,
    category: "burger",
  },
  {
    name: "Supreme Nachos Deluxe Tendercrisp",
    image:
      "https://www.burgerking.com.my/upload/image/Product/127/Supreme%20Nachos%20Deluxe%20Tendercrisp%20Ala%20Carte.png",
    description:
      "Crispy Tendercrisp chicken fillet topped with nacho cheese, tortilla chips, lettuce, tomatoes, and spicy sauce.",
    price: 7.99,
    rating: 4.9,
    numReviews: 15,
    availability: true,
    category: "burger",
  },
  {
    name: "Long Cheesy Onion Beef",
    image:
      "https://www.burgerking.com.my/upload/image/Product/116/Cheesy%20Onion%20Long%20Beef%20Ala%20Carte.png",
    description:
      "Long beef patty topped with rich cheese sauce, crispy onion rings, and smoky BBQ sauce in a soft hoagie-style bun.",
    price: 6.49,
    rating: 4.3,
    numReviews: 78,
    availability: true,
    category: "burger",
  },
  {
    name: "Angus Signature Burger",
    image:
      "https://www.burgerking.com.my/upload/image/Product/160/0-Signature%20Angus.png",
    description:
      "A gourmet Angus beef burger with sharp cheddar, caramelized onions, pickles, and zesty signature sauce on a brioche bun.",
    price: 7.99,
    rating: 4.0,
    numReviews: 65,
    availability: true,
    category: "burger",
  },
  {
    name: "Fully Loaded Croissant with Egg",
    image:
      "https://www.burgerking.com.my/upload/image/Product/104/0-J1004668_BREAKFAST%20WITH%20CROISSAN%27WICH%20%28FEB%2724%29%20-%20HOME%20DELIVERY%20SKU_Fully%20%20Loaded.png",
    description:
      "A breakfast croissant packed with egg, beef sausage, smoked bacon, and melted cheese — hearty and satisfying.",
    price: 5.99,
    rating: 4.7,
    numReviews: 110,
    availability: true,
    category: "burger",
  },
  {
    name: "Whopper",
    image:
      "https://www.burgerking.com.my/upload/image/Product/8/Whopper%20Ala%20Carte.png",
    description:
      "The iconic flame-grilled beef patty with tomatoes, lettuce, pickles, onions, ketchup, and mayo on a toasted sesame bun.",
    price: 5.99,
    rating: 4.6,
    numReviews: 89,
    availability: false,
    category: "burger",
  },
  {
    name: "Triple Whopper Jr with Cheese",
    image:
      "https://www.burgerking.com.my/upload/image/Product/126/Triple%20Whopper%20Junior%20with%20Cheese%20Ala%20Carte.png",
    description:
      "Three junior beef patties stacked high with American cheese, fresh veggies, and tangy sauces on a sesame bun.",
    price: 7.59,
    rating: 4.9,
    numReviews: 15,
    availability: true,
    category: "burger",
  },
  {
    name: "Supreme Nachos Deluxe Tendercrisp",
    image:
      "https://www.burgerking.com.my/upload/image/Product/127/Supreme%20Nachos%20Deluxe%20Tendercrisp%20Ala%20Carte.png",
    description:
      "Crispy Tendercrisp chicken fillet topped with nacho cheese, tortilla chips, lettuce, tomatoes, and spicy sauce.",
    price: 7.99,
    rating: 4.9,
    numReviews: 15,
    availability: true,
    category: "burger",
  },
];

export default products;
