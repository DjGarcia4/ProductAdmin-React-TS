import { safeParse } from "valibot";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import axios from "axios";
import { toast } from "react-toastify";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_URL_API}/api/products`;

      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
      toast.success("Producto creado correctamente");
    } else {
      throw new Error("Datos nos Válidos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_URL_API}/api/products`;
    const { data } = await axios(url);

    const result = safeParse(ProductsSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_URL_API}/api/products/${id}`;
    const { data } = await axios.get(url);

    const result = safeParse(ProductSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }
  } catch (error) {
    console.log(error);
  }
}
