import { useSearchParams } from "react-router-dom";

type ParamValue = string | number | boolean;
type ParamsObject = Record<string, ParamValue>;

const parseValue = (value: string): string | number | boolean => {
  if (value === null) return "";

  if (value.trim() !== "" && !isNaN(Number(value))) {
    return Number(value);
  }

  return value;
};

export const useTableParams = <T extends ParamsObject>(defaults: T) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    ...defaults,
  } as T;

  for (const [key, value] of searchParams.entries()) {
    (params as Record<string, unknown>)[key] = parseValue(value);
  }

  const setParams = (newParams: Partial<T>) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([key, value]) => {
        if (!value) {
          updated.delete(key);
        } else {
          updated.set(key, String(value));
        }
      });

      return updated;
    });
  };

  return {
    params,
    setParams,
  };
};
