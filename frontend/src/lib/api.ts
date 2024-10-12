import { hc } from "hono/client";
import { type ApiRoutes } from "@server/index";
import { queryOptions } from "@tanstack/react-query";
import { type CreateEmployee } from "@server/sharedTypes";

const client = hc<ApiRoutes>("/");

export const api = client.api;

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  staleTime: Infinity,
});

export async function getAllEmployee() {
  const res = await api.employee.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}
export const getAllEmployeeQueryOptions = queryOptions({
  queryKey: ["get-all-employee"],
  queryFn: getAllEmployee,
  staleTime: 1000 * 60 * 5,
});

export async function createEmployee({ value }: { value: CreateEmployee }) {
  const res = await api.employee.$post({ json: value });
  if (!res.ok) {
    throw new Error("server error");
  }

  const newEmployee = await res.json();
  return newEmployee;
}

export const loadingCreateEmployeeQueryOptions = queryOptions<{
  employee?: CreateEmployee;
}>({
  queryKey: ["loading-create-employee"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

export async function deleteEmployee({ id }: { id: number }) {
  const res = await api.employee[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    throw new Error("server error");
  }
}
