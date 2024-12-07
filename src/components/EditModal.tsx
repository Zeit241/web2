"use client";
import { useEffect, useCallback } from "react";
import { useDropzone } from 'react-dropzone';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  type: "doctors" | "services" | "news" | "specializations" | "categories";
  data: any;
  isCreating?: boolean;
}

interface Specialization {
  id: number;
  name: string;
}

export default function EditModal({ isOpen, onClose, onSave, type, data, isCreating }: EditModalProps) {
    const [formData, setFormData] = useState(data || {});
    const [photoPreview, setPhotoPreview] = useState(data?.photo || null);
    const [specializations, setSpecializations] = useState<Specialization[]>([]);
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(
      data?.specializations || []
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{
      name?: string;
      specializations?: string;
      price?: string;
      service_name?: string;
      title?: string;
      content?: string;
    }>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {

        setPhotoPreview(reader.result as string);
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }, [formData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1
  });

  useEffect(() => {
    // Загрузка списка специализаций
    const fetchSpecializations = async () => {
      try {
        const response = await fetch('/api/specializations');
        const data = await response.json();
        setSpecializations(data.specializations);
      } catch (error) {
        console.error('Ошибка при загрузке специализаций:', error);
      }
    };

    if (type === 'doctors') {
      fetchSpecializations();
    }
  }, [type]);

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
      });
      
      setPhotoPreview(data.photo);
      setSelectedSpecializations(data.specializations || []);
    }
  }, [data]);

  const handleSpecializationSelect = (specializationName: string) => {
    if (!selectedSpecializations.includes(specializationName)) {
      const newSpecializations = [...selectedSpecializations, specializationName];
      setSelectedSpecializations(newSpecializations);
      setFormData((prev: Specialization) => ({
        ...prev,
        specializations: newSpecializations
      }));
    }
  };

  const handleRemoveSpecialization = (specializationName: string) => {
    const newSpecializations = selectedSpecializations.filter(
      spec => spec !== specializationName
    );
    setSelectedSpecializations(newSpecializations);
    setFormData((prev: Specialization) => ({
      ...prev,
      specializations: newSpecializations
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Валидация
    const newErrors: { name?: string; specializations?: string } = {};
    

    if (type === 'doctors') {
      if (!formData.name?.trim()) {
        newErrors.name = 'Имя врача обязательно';
      }
      
      if (type === 'doctors' && (!selectedSpecializations || selectedSpecializations.length === 0)) {
        newErrors.specializations = 'Выберите хотя бы одну специализацию';
      }
    }

    if (type === 'services') {
      if (!formData.service_name?.trim()) {
        newErrors.service_name = 'Название услуги обязательно';
      }
      if (!formData.price) {
        newErrors.price = 'Укажите цену услуги';
      }
    }

    if (type === 'news') {
      if (!formData.title?.trim()) {
        newErrors.title = 'Заголовок новости обязателен';
      }
      if (!formData.content?.trim()) {
        newErrors.content = 'Содержание новости обязательно';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        ...formData,
        specializations: selectedSpecializations,
      });
      onClose();
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeTitle = (type: string): string => {
    const titles: { [key: string]: string } = {
      doctors: "врача",
      services: "услугу",
      news: "новость",
      specializations: "специализацию",
      categories: "категорию"
    };
    return titles[type] || type;
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>
            {isCreating ? `Создать ${getTypeTitle(type)}` : `Редактировать ${getTypeTitle(type)}`}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "doctors" && (
            <>
              <div className="space-y-2">
                <label>Имя</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label>Опыт работы (лет)</label>
                <Input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <label>Фото</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-4">
                    {photoPreview ? (
                      <>
                        <div className="relative h-32 w-32">
                          <Image
                            src={photoPreview}
                            alt="Preview"
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Перетащите новое фото или кликните для выбоа
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Перетащите фото сюда или кликните для выбора
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label>Телефон</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label>Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label>Описание</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label>Специализации</label>
                <Select onValueChange={handleSpecializationSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите специализацию" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations
                      .filter(spec => !selectedSpecializations.includes(spec.name))
                      .map((spec) => (
                        <SelectItem key={spec.id} value={spec.name}>
                          {spec.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedSpecializations.map((spec) => (
                    <Badge 
                      key={spec} 
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {spec}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => handleRemoveSpecialization(spec)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {type === "services" && (
            <>
              <div className="space-y-2">
                <label>Название</label>
                <Input
                  value={formData.service_name}
                  onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                />
              </div>
              {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              <div className="space-y-2">
                <label>Описание</label>
                <Textarea
                  value={formData.service_description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label>Цена</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                />
                 {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>
            </>
          )}

            {(type === "specializations" || type === "categories") && (
            <>
              <div className="space-y-2">
                <label>Название</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              {type === "categories" && (
                <div className="space-y-2">
                  <label>Описание</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              )}
            </>
          )}

          {type === "news" && (
            <>
              <div className="space-y-2">
                <label>Заголовок</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label>Содержание</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label>Изображение</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-4">
                    {photoPreview ? (
                      <>
                        <div className="relative h-32 w-32">
                          <Image
                            src={photoPreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Перетащите новое изображение или кликните для выбора
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Перетащите изображение сюда или кликните для выбора
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Сохранение...
                </>
              ) : (
                'Сохранить'
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 