export type TableType =
  | "doctors"
  | "news"
  | "services"
  | "specializations"
  | "categories";

export interface Doctor {
  id: number;
  name: string;
  experience: number;
  phone: string;
  email: string;
  photo: string;
  position: "Доктор" | "Главный врач" | "Генеральный директор";
  description: string;
  created_at: string;
  specializations: string[];
}

export interface Service {
  id: number;
  service_name: string;
  service_description: string;
  price: number;
  category_name: string;
  created_at: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  image: string;
  published_at: string;
}

export interface Specialization {
  id: number;
  name: string;
  description: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  description: string;
}
