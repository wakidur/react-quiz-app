export const setItemToLocalStorage = (name, item) => {
    localStorage.setItem(`${name}`, JSON.stringify(item));
};
export const getItemFromLocalStorage = (name, item) =>  JSON.parse(localStorage.getItem(`${name}`));

export const removeItemFromLocalStorage = (name, item) => localStorage.removeItem(`${name}`);

export const clearLocalStorage = () => localStorage.clear();