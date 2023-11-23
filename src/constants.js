export const LIMIT_PER_PAGE = 12;

export const filters = [
    {
        name: 'subCategory', heading: 'Category', options: [
            'tshirt', 'shirt', 'shorts', 'jogger', 'hoodie', 'tracksuit', 'pyjamas', 'trouser', 'jeans', 'kurta', 'kurti', 'sweater', 'jumpsuit'
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
            'OFFICIAL TOM %26 JERRY MERCHANDISE',
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
];

export const bannerItems = [
    { id: 1, filter: { brand: 'Bewakoof Air® 1.0_Bewakoof®' } },
    { id: 2, filter: { subCategory: 'hoodie_sweater' } },
    { id: 3, filter: { brand: 'OFFICIAL NARUTO MERCHANDISE' } },
    { id: 4, filter: { brand: 'OFFICIAL COCA COLA MERCHANDISE' } }
];

export const popularSearches = [
    'tshirt', 'shirt', 'shorts', 'jogger', 'hoodie', 'tracksuit', 'pyjamas', 'trouser', 'jeans', 'kurta', 'kurti', 'sweater', 'jumpsuit'
];

export const addressTypes = ['HOME', "WORK", 'OTHER'];

export const THTBM = [
    { id: 1, name: 'TRENDY T-SHIRT', filter: { price: 399, subCategory: 'tshirt' } },
    { id: 2, name: 'NEW ARRIVALS', filter: { subCategory: 'pyjamas', sellerTag: 'new arrival' } },
    { id: 3, name: 'T-SHIRTS', filter: { subCategory: 'tshirt', sellerTag: 'new arrival' } },
    { id: 4, name: 'T-SHIRTS', filter: { subCategory: 'tshirt', brand: 'Bewakoof American Pima' } },
];

export const CTB = [
    { id: 1, name: 'Shirts', filter: { subCategory: 'shirt', gender: 'Men' } },
    { id: 2, name: 'Boxers', filter: { subCategory: 'shorts', gender: 'Men' } },
    { id: 3, name: 'Pyjamas', filter: { subCategory: 'pyjamas', gender: 'Men' } },
    { id: 4, name: 'Co-ords', filter: { subCategory: 'shirt', gender: 'Women' } },
    { id: 5, name: 'Pyjamas', filter: { subCategory: 'pyjamas', gender: 'Women' } },
    { id: 6, name: 'Shorts', filter: { subCategory: 'shorts', gender: 'Women' } }
];

export const OBP = [
    { id: 1, name: 'Graphic Print Bags', filter: { subCategory: 'bags' } },
    { id: 2, name: 'Bewakoof Air® 1.0', filter: { brand: 'Bewakoof Air® 1.0' } },
    { id: 3, name: 'T-shirts', filter: { subCategory: 'tshirt' } },
    { id: 4, name: 'Plus Size Store', filter: { size: 'XXL' } }
];


export const sizes = [
    { size: 'S', chest: '42.0', frontLength: '29.0', sleeveLength: '9.75' },
    { size: 'M', chest: '44.0', frontLength: '29.75', sleeveLength: '10.0' },
    { size: 'L', chest: '46.0', frontLength: '30.5', sleeveLength: '10.25' },
    { size: 'XL', chest: '48.0', frontLength: '31.25', sleeveLength: '10.5' },
    { size: 'XXL', chest: '50.0', frontLength: '32.0', sleeveLength: '10.75' },
    { size: 'XXXL', chest: '52.0', frontLength: '32.75', sleeveLength: '11.0' },
];