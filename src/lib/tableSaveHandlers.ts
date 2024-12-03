import { showToast } from "@/components/ui/toast";

type SetDataFunction = (data: any) => void;

interface SaveHandlerProps {
  setData: SetDataFunction;
  setFilteredData: SetDataFunction;
  setIsEditModalOpen: (isOpen: boolean) => void;
}

export const createSaveHandlers = ({
  setData,
  setFilteredData,
  setIsEditModalOpen,
}: SaveHandlerProps) => {
  const handleDoctorSave = async (updatedData: any) => {
    console.log("updatedData", updatedData);
    try {
      const method = updatedData.id ? "PUT" : "POST";
      const url =
        method === "PUT" ? `/api/doctors/${updatedData.id}` : `/api/doctors`;

      console.log("updatedData", updatedData);

      const response = await fetch(url, {
        method,
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (result.error) {
        showToast.error(
          `Ошибка при ${updatedData.id ? "обновлении" : "создании"} доктора`
        );
        throw new Error(result.error);
      }

      showToast.success(
        `Доктор успешно ${updatedData.id ? "обновлен" : "создан"}`
      );

      updateTableData(result.doctor, updatedData.id);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleServiceSave = async (updatedData: any) => {
    console.log("updatedData", updatedData);
    try {
      const method = updatedData.id ? "PUT" : "POST";
      const url = updatedData.id
        ? `/api/services/${updatedData.id}`
        : `/api/services`;

      const response = await fetch(url, {
        method,
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (result.error) {
        showToast.error(
          `Ошибка при ${updatedData.id ? "обновлении" : "создании"} услуги`
        );
        throw new Error(result.error);
      }

      showToast.success(
        `Услуга успешно ${updatedData.id ? "обновлена" : "создана"}`
      );

      updateTableData(result.service, updatedData.id);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNewsSave = async (updatedData: any) => {
    try {
      const method = updatedData.id ? "PUT" : "POST";
      const url = updatedData.id ? `/api/news/${updatedData.id}` : `/api/news`;

      const response = await fetch(url, {
        method,
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (result.error) {
        showToast.error(
          `Ошибка при ${updatedData.id ? "обновлении" : "создании"} новости`
        );
        throw new Error(result.error);
      }

      showToast.success(
        `Новость успешно ${updatedData.id ? "обновлена" : "создана"}`
      );

      updateTableData(result.news, updatedData.id);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSpecializationSave = async (updatedData: any) => {
    try {
      const method = updatedData.id ? "PUT" : "POST";
      const url = updatedData.id
        ? `/api/specializations/${updatedData.id}`
        : `/api/specializations`;

      const response = await fetch(url, {
        method,
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (result.error) {
        showToast.error(
          `Ошибка при ${
            updatedData.id ? "обновлении" : "создании"
          } специализации`
        );
        throw new Error(result.error);
      }

      showToast.success(
        `Специализация успешно ${updatedData.id ? "обновлена" : "создана"}`
      );

      updateTableData(result.specialization, updatedData.id);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCategorySave = async (updatedData: any) => {
    try {
      const formData = new FormData();
      Object.keys(updatedData).forEach((key) => {
        formData.append(key, updatedData[key]?.toString() || "");
      });

      const method = updatedData.id ? "PUT" : "POST";
      const url = updatedData.id
        ? `/api/categories/${updatedData.id}`
        : `/api/categories`;

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();

      if (result.error) {
        showToast.error(
          `Ошибка при ${updatedData.id ? "обновлении" : "создании"} категории`
        );
        throw new Error(result.error);
      }

      showToast.success(
        `Категория успешно ${updatedData.id ? "обновлена" : "создана"}`
      );

      updateTableData(result.category, updatedData.id);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateTableData = (resultItem: any, hasId: number | undefined) => {
    if (hasId) {
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item.id === resultItem.id ? resultItem : item
        )
      );
      setFilteredData((prevData: any) =>
        prevData.map((item: any) =>
          item.id === resultItem.id ? resultItem : item
        )
      );
    } else {
      setData((prevData: any) => [...prevData, resultItem]);
      setFilteredData((prevData: any) => [...prevData, resultItem]);
    }
  };

  return {
    handleSave: async (type: string, updatedData: any) => {
      switch (type) {
        case "doctors":
          await handleDoctorSave(updatedData);
          break;
        case "services":
          await handleServiceSave(updatedData);
          break;
        case "news":
          await handleNewsSave(updatedData);
          break;
        case "specializations":
          await handleSpecializationSave(updatedData);
          break;
        case "categories":
          await handleCategorySave(updatedData);
          break;
        default:
          console.error("Неизвестный тип:", type);
      }
    },
  };
};
