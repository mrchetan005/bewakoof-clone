export const LIMIT_PER_PAGE = 12;

export const filters = [
    {
        name: 'subCategory', heading: 'Category', options: [
            'tshirt', 'jeans', 'shorts', 'shirt', 'jogger', 'pyjamas', 'trouser', 'hoodie', 'kurta', 'kurti', 'sweater', 'tracksuit'
        ]
    },
    {
        name: 'size', heading: 'Size', options: [
            'S', 'M', 'L', 'XL', 'XXL'
        ]
    },
    {
        name: 'color', heading: 'Color', options: [
            'BLACK', 'BLUE', 'WHITE', 'GREEN', 'GREY', 'BROWN', 'SILVER', 'RED', 'PINK', 'PURPLE', 'MAROON', 'YELLOW', 'ORANGE', 'CREAM', 'OLIVE', 'BEIGE',
        ]
    },
    {
        name: 'brand', heading: 'Brand', options: [
            'Bewakoof®',
            'Bewakoof Air® 1.0',
            'BEWAKOOF X STREETWEAR',
            'Bewakoof American Pima',
            'TISTABENE', '7 Shores', 'Campus Sutra', 'Style Quotient', 'CHIMPAAANZEE', 'THE DAILY OUTFITS', 'ANGEL FAB', 'TALES and STORIES', 'Blue Tyga', 'Hubberholme', 'Smugglerz', 'Alstyle', 'Lounge Dreams', 'Kotty', 'TrueBuyWorld', 'Chkokko', 'Urban Scottish', 'Breakbounce', 'INDICLUB', 'Rigo', 'Shopolics', 'Thomas Scott', 'Instafab Plus', 'Old Grey',
            'XYXX', 'SAVVAO', 'Bstories',
            'OFFICIAL DISNEY MERCHANDISE',
            'OFFICIAL NARUTO MERCHANDISE',
            'OFFICIAL GARFIELD MERCHANDISE',
            'OFFICIAL TOM & JERRY MERCHANDISE',
            'OFFICIAL MARVEL MERCHANDISE',
            'OFFICIAL STAR WARS MERCHANDISE',
            'OFFICIAL DC MERCHANDISE',
            'OFFICIAL NASA MERCHANDISE',
            'OFFICIAL MINIONS MERCHANDISE',
            'OFFICIAL HARRY POTTER MERCHANDISE',
            'OFFICIAL HOUSE OF THE DRAGON MERCHANDISE',
            'OFFICIAL LOONEY TUNES MERCHANDISE',
            'OFFICIAL CARTOON NETWORK MERCHANDISE',
            'OFFICIAL PEANUTS MERCHANDISE',
            'OFFICIAL COCA COLA MERCHANDISE',
            'OFFICIAL RICK AND MORTY MERCHANDISE'
        ]
    },
    {
        name: 'sellerTag', heading: 'Sort By', options: [
            'top rated', 'new arrival', 'trending', 'best seller'
        ]
    }
];

export const sortByFilters = filters?.at(-1);

export const sortByPrice = [
    { name: 'Price : High to Low', value: -1 },
    { name: 'Price : Low to High', value: 1 }
]

export const popularSearches = [
    'tshirt', 'jeans', 'shorts', 'shirt', 'jogger', 'pyjamas', 'trouser', 'hoodie', 'kurta', 'kurti', 'sweater', 'tracksuit'
];