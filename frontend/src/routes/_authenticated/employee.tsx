import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import {
  getAllEmployeeQueryOptions,
  loadingCreateEmployeeQueryOptions,
  deleteEmployee,
} from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/employee")({
  component: Employee,
});

function Employee() {
  const { isPending, error, data } = useQuery(getAllEmployeeQueryOptions);
  const { data: loadingCreateEmployee } = useQuery(
    loadingCreateEmployeeQueryOptions
  );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table>
        <TableCaption>A list of all your employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateEmployee?.employee && (
            <TableRow>
              <TableCell className="font-medium">
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>{loadingCreateEmployee?.employee.name}</TableCell>
              <TableCell>{loadingCreateEmployee?.employee.employeeid}</TableCell>
              <TableCell className="font-medium">
                <Skeleton className="h-4" />
              </TableCell>
            </TableRow>
          )}
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : data?.employee.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.employeeid}</TableCell>
                  <TableCell>
                    <EmployeeDeleteButton id={employee.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}

function EmployeeDeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteEmployee,
    onError: () => {
      toast("Error", {
        description: `Failed to delete employee: ${id}`,
      });
    },
    onSuccess: () => {
      toast("Employee Deleted", {
        description: `Successfully deleted employee: ${id}`,
      });

      queryClient.setQueryData(
        getAllEmployeeQueryOptions.queryKey,
        (existingEmployee) => ({
          ...existingEmployee,
          employee: existingEmployee!.employee.filter((e) => e.id !== id),
        })
      );
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ id })}
      variant="outline"
      size="icon"
    >
      {mutation.isPending ? "..." : <Trash className="h-4 w-4" />}
    </Button>
  );
}
