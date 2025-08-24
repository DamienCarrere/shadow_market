export async function importData () {
    const res = await fetch('https://dummyjson.com/products')
    const data = res.json();
    return data;
}