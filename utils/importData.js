export async function importData(productId) {
	const res = await fetch(`https://dummyjson.com/products/${productId}`);
	const data = await res.json();
	return data;
}
