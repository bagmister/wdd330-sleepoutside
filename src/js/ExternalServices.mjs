const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}: ${res.statusText}`);
  }
  try {
    return await res.json();
  } catch (error) {
    throw new Error(`Failed to parse JSON response: ${error.message}`);
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    console.log("response: ", response)
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const products = await this.getData(this.category);
    console.log("products to load: ", products)
    let value = products.find((item) => item.Id === id);
    return value;
  }
}
