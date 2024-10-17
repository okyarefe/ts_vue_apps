import type { Comics } from "@/types";

const BACKEND_END_POINT = "http://localhost:5000/marvel";

export const useComics = async (): Promise<Comics> => {
  const response = await fetch(BACKEND_END_POINT);
  const data = await response.json();
  console.log("Data from backend:", data);
  return data;
};
