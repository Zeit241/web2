import { showToast } from "@/components/ui/toast";

type SetDataFunction = (data: any) => void;

interface DeleteHandlerProps {
  setData: SetDataFunction;
  setFilteredData: SetDataFunction;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  setIsDeleting: (isDeleting: boolean) => void;
}

export const createDeleteHandlers = ({
  setData,
  setFilteredData,
  setIsDeleteDialogOpen,
  setIsDeleting,
}: DeleteHandlerProps) => {
  const updateTableData = (deletedId: number) => {
    setData((prevData: any) =>
      prevData.filter((item: any) => item.id !== deletedId)
    );
    setFilteredData((prevData: any) =>
      prevData.filter((item: any) => item.id !== deletedId)
    );
  };

  const handleDoctorDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/doctors/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.error) {
        showToast.error("Ошибка при удалении доктора");
        throw new Error(result.error);
      }

      showToast.success("Доктор успешно удален");
      updateTableData(id);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleServiceDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.error) {
        showToast.error("Ошибка при удалении услуги");
        throw new Error(result.error);
      }

      showToast.success("Услуга успешно удалена");
      updateTableData(id);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleNewsDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.error) {
        showToast.error("Ошибка при удалении новости");
        throw new Error(result.error);
      }

      showToast.success("Новость успешно удалена");
      updateTableData(id);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSpecializationDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/specializations/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.error) {
        showToast.error("Ошибка при удалении специализации");
        throw new Error(result.error);
      }

      showToast.success("Специализация успешно удалена");
      updateTableData(id);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleCategoryDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.error) {
        showToast.error("Ошибка при удалении категории");
        throw new Error(result.error);
      }

      showToast.success("Категория успешно удалена");
      updateTableData(id);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return {
    handleDelete: async (type: string, id: number) => {
      switch (type) {
        case "doctors":
          await handleDoctorDelete(id);
          break;
        case "services":
          await handleServiceDelete(id);
          break;
        case "news":
          await handleNewsDelete(id);
          break;
        case "specializations":
          await handleSpecializationDelete(id);
          break;
        case "categories":
          await handleCategoryDelete(id);
          break;
        default:
          console.error("Неизвестный тип:", type);
      }
    },
  };
};
