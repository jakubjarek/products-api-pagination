export interface ProductType {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface DataType {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ProductType[];
}
