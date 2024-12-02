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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setFormData({ ...formData, photo: file });
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
        phone: data.phone || '',
        email: data.email || '',
        description: data.description || ''
      });
      setPhotoPreview(data.photo || null);
      setSelectedSpecializations(data.specializations || []);
    }
  }, [data]);

  const handleSpecializationSelect = (specializationName: string) => {
    if (!selectedSpecializations.includes(specializationName)) {
      const newSpecializations = [...selectedSpecializations, specializationName];
      setSelectedSpecializations(newSpecializations);
      setFormData(prev => ({
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
    setFormData(prev => ({
      ...prev,
      specializations: newSpecializations
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      console.error('Name is required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (type === 'specializations') {
        // Для специализаций отправляем JSON
        await onSave({
          id: formData.id,
          name: formData.name
        });
      } else {
        // Для остальных типов используем FormData
        const submitData = new FormData();
        
        Object.keys(formData).forEach(key => {
          if (key === 'photo' && formData[key] instanceof File) {
            submitData.append(key, formData[key]);
          } else if (Array.isArray(formData[key])) {
            formData[key].forEach((value: string) => {
              submitData.append(`${key}[]`, value);
            });
          } else {
            submitData.append(key, formData[key]?.toString() || '');
          }
        });

        await onSave(submitData);
      }
      onClose();
    } catch (error) {
      console.error('Error:', error);
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
      <DialogContent className="sm:max-w-[425px]">
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
                />
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
                          Перетащите новое фото или кликните для выбора
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
              <div className="space-y-2">
                <label>Описание</label>
                <Textarea
                  value={formData.service_description}
                  onChange={(e) => setFormData({ ...formData, service_description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label>Цена</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                />
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