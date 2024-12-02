"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface Service {
  service_id: number;
  service_name: string;
  service_description: string;
  price: string;
  category_name: string;
}

export default function ServicesTable() {
  const [servicesList, setServicesList] = useState<Service[]>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((e) => e.json())
      .then((e) => {
        if (e.services) {
          setServicesList(e.services);
          const uniqueCategories = Array.from(new Set(e.services.map((s: Service) => s.category_name))) as string[];
          setCategories(uniqueCategories);
        }
      });
  }, []);

  const filteredServices = servicesList?.filter((service) => {
    const matchesSearch = 
      service.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.service_description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      !selectedCategory || service.category_name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Группировка услуг по категориям
  const groupedServices = filteredServices?.reduce((acc, service) => {
    if (!acc[service.category_name]) {
      acc[service.category_name] = [];
    }
    acc[service.category_name].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Поиск услуги..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-[300px]"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="">Все категории</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <Card>
        <CardContent className="p-0">
          {servicesList ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Название услуги</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead className="text-right">Цена</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedServices && Object.entries(groupedServices).map(([category, services]) => (
                  <>
                    <TableRow key={category} className="bg-gray-50">
                      <TableCell colSpan={3} className="font-bold">
                        {category}
                      </TableCell>
                    </TableRow>
                    {services.map((service) => (
                      <TableRow key={service.service_id}>
                        <TableCell className="font-medium">
                          {service.service_name}
                        </TableCell>
                        <TableCell>{service.service_description}</TableCell>
                        <TableCell className="text-right">{service.price}</TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Skeleton className="w-full h-[300px] rounded-2xl" />
          )}
        </CardContent>
      </Card>
    </div>
  );
} 