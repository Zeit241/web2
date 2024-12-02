"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Search, Trash2, Plus, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import { Skeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";

// Определяем типы данных
interface Doctor {
  id: number;
  name: string;
  experience: number;
  phone: string;
  email: string;
  photo: string;
  position: 'Доктор' | 'Главный врач' | 'Генеральный директор';
  description: string;
  created_at: string;
  specializations: string[];
}

interface Service {
  id: number;
  service_name: string;
  service_description: string;
  price: number;
  category_name: string;
  created_at: string;
}

interface News {
  id: number;
  title: string;
  content: string;
  image: string;
  published_at: string;
}

interface Specialization {
  id: number;
  name: string;
  description: string;
}

interface ServiceCategory {
  id: number;
  name: string;
  description: string;
}

function TableHeaderData(props: { type: "doctors" | "news" | "services" | "specializations" | "categories" }) {
  if (props.type === "doctors") {
    return (
      <>
        <TableHead>Имя</TableHead>
        <TableHead>Должность</TableHead>
        <TableHead>Специализации</TableHead>
        <TableHead>Опыт работы</TableHead>
        <TableHead>Контакты</TableHead>
      </>
    );
  }

  if (props.type === "services") {
    return (
      <>
        <TableHead>Название</TableHead>
        <TableHead>Описание</TableHead>
        <TableHead>Категория</TableHead>
        <TableHead>Цена</TableHead>
      </>
    );
  }

  if (props.type === "news") {
    return (
      <>
        <TableHead>Заголовок</TableHead>
        <TableHead>Текст</TableHead>
        <TableHead>Дата публикации</TableHead>
      </>
    );
  }

  if (props.type === "specializations") {
    return (
      <>
        <TableHead>Название</TableHead>
      </>
    );
  }

  if (props.type === "categories") {
    return (
      <>
        <TableHead>Название</TableHead>
        <TableHead>Описание</TableHead>
      </>
    );
  }
}

function TableSkeleton({ type }: { type: string }) {
  const getColumnCount = () => {
    switch (type) {
      case "doctors": return 7; // №, Имя, Должность, Специализации, Опыт, Контакты, Действия
      case "services": return 6; // №, Название, Описание, Категория, Цена, Действия
      case "news": return 5; // №, Заголовок, Текст, Дата, Действия
      case "specializations": return 3; // №, Название, Действия
      case "categories": return 4; // №, Название, Описание, Действия
      default: return 4;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array(getColumnCount()).fill(0).map((_, index) => (
            <TableHead key={index}>
              <Skeleton className="h-8 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(5).fill(0).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array(getColumnCount()).fill(0).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-8 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function DashboardTable(props: { data: any; type: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(props.data);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState(props.data);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (record: any) => {
    setEditingItem(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/${props.type}/${deletingId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
      setIsDeleteDialogOpen(false);
      showToast.success('Запись успешно удалена');
      // Удаляем запись из состояния
      const newData = data.filter(item => item.id !== deletingId);
      setData(newData);
      setFilteredData(newData);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      showToast.error('Ошибка при удалении записи');
      console.error('Error deleting:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(props.data);
      setFilteredData(props.data);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [props.data, props.type]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(data);
      return;
    }

    const filtered = data?.filter((item: any) => {
      const query = searchQuery.toLowerCase();
      
      if (props.type === "doctors") {
        return (
          item.name.toLowerCase().includes(query) ||
          item.position.toLowerCase().includes(query) ||
          item.specializations.some((spec: string) => spec.toLowerCase().includes(query)) ||
          item.description.toLowerCase().includes(query)
        );
      } else if (props.type === "services") {
        return (
          item.service_name.toLowerCase().includes(query) ||
          item.service_description.toLowerCase().includes(query) ||
          item.category_name.toLowerCase().includes(query)
        );
      } else if (props.type === "news") {
        return (
          item.title.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query)
        );
      } else if (props.type === "specializations") {
        return (
          item.name.toLowerCase().includes(query)
        );
      } else if (props.type === "categories") {
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      }
    });
    setFilteredData(filtered);
  }, [searchQuery, data, props.type]);

  const handleSave = async (updatedData: any) => {
    try {
      const formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        if (key === 'photo' && updatedData[key] instanceof File) {
          formData.append(key, updatedData[key]);
        } else if (Array.isArray(updatedData[key])) {
          updatedData[key].forEach((value: string) => {
            formData.append(`${key}[]`, value);
          });
        } else {
          formData.append(key, updatedData[key]?.toString() || '');
        }
      });

      const method = updatedData.id ? 'PUT' : 'POST';
      const url = updatedData.id 
        ? `/api/${props.type}/${updatedData.id}`
        : `/api/${props.type}`;

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();
      
      if (result.error) {
        showToast.error(`Ошибка при ${updatedData.id ? 'обновлении' : 'создании'} записи`);
        throw new Error(result.error);
      }

      showToast.success(`Запись успешно ${updatedData.id ? 'обновлена' : 'создана'}`);
      
      const resultItem = props.type === 'specializations' 
        ? result.specialization 
        : result.doctor;

      if (updatedData.id) {
        setData(prevData => prevData.map(item => 
          item.id === resultItem.id ? resultItem : item
        ));
        setFilteredData(prevData => prevData.map(item => 
          item.id === resultItem.id ? resultItem : item
        ));
      } else {
        setData(prevData => [...prevData, resultItem]);
        setFilteredData(prevData => [...prevData, resultItem]);
      }
      
      setIsEditModalOpen(false);
    } catch (error) {
      showToast.error('Ошибка при создании/обновлении записи');
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-4 p-3">
      <div className="flex items-center justify-between">
        <Button 
          variant={"outline"} 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Добавить запись
        </Button>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Поиск..."
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
        </div>
      </div>
      
      {isLoading ? (
        <TableSkeleton type={props.type} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] pl-4">№</TableHead>
              <TableHeaderData type={props.type as any} />
              <TableHead className="text-right pr-4">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((record: any, index: number) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium pl-4">{index + 1}</TableCell>
                {props.type === "news" ? (
                  <>
                    <TableCell>{record.title}</TableCell>
                    <TableCell>{record?.content?.slice(0, 50)}...</TableCell>
                    <TableCell>{new Date(record.published_at).toLocaleDateString('ru-RU')}</TableCell>
                  </>
                ) : props.type === "doctors" ? (
                  <>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.position}</TableCell>
                    <TableCell>{record?.specializations?.join(', ')}</TableCell>
                    <TableCell>{record.experience} лет</TableCell>
                    <TableCell>
                      {record.phone && <div>{record.phone}</div>}
                      {record.email && <div>{record.email}</div>}
                    </TableCell>
                  </>
                ) : props.type === "services" ? (
                  <>
                    <TableCell>{record.service_name}</TableCell>
                    <TableCell>{record.service_description}</TableCell>
                    <TableCell>{record.category_name}</TableCell>
                    <TableCell>{record.price} ₽</TableCell>
                  </>
                ) : props.type === "specializations" ? (
                  <>
                    <TableCell>{record.name}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.description}</TableCell>
                  </>
                )}
                <TableCell className="text-right pr-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(record)}>
                  <Pencil />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2" 
                    onClick={() => handleDelete(record.id)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        type={props.type}
        data={editingItem}
      />

      <EditModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSave}
        type={props.type}
        data={null}
        isCreating={true}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить эту запись? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Отмена
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Удаление...
                </>
              ) : (
                'Удалить'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
