import { useState } from "react";

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setField = (name: keyof T, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { formData, handleChange, setField };
}
