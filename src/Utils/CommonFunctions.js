export const checkItemIsAdded = (items, id) => {
    return items?.some(({ products }) => (products?._id ? products?._id : products) === id);
}

export const includePath = (pathname, paths) => {
    return paths.some((path) => pathname.includes(path));
}

export const getRandomDiscount = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getDiscountedPrice = (price, discount) => {
    return price + Math.round(price * discount / 100);
}

export const checkEqual = (obj1, obj2) => {
    // ? Check if both objects are objects
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return obj1 === obj2;
    }

    // ? Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // ? Check if the number of keys is the same
    if (keys1.length !== keys2.length) {
        return false;
    }

    // ? Iterate over keys and recursively compare values
    for (const key of keys1) {
        if (!keys2.includes(key) || !checkEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}
