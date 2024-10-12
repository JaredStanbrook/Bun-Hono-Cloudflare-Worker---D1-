import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import {
    createEmployee,
    getAllEmployeeQueryOptions,
    loadingCreateEmployeeQueryOptions,
} from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

import { zodValidator } from "@tanstack/zod-form-adapter";

import { createEmployeeSchema } from "@server/sharedTypes";

export const Route = createFileRoute("/_authenticated/create-employee")({
    component: CreateEmployee,
});

function CreateEmployee() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const form = useForm({
        validatorAdapter: zodValidator(),
        defaultValues: {
            name: "",
            employeeid: "",
        },
        onSubmit: async ({ value }) => {
            const existingEmployee = await queryClient.ensureQueryData(getAllEmployeeQueryOptions);

            navigate({ to: "/employee" });

            // loading state
            queryClient.setQueryData(loadingCreateEmployeeQueryOptions.queryKey, {
                employee: value,
            });

            try {
                const newEmployee = await createEmployee({ value });

                queryClient.setQueryData(getAllEmployeeQueryOptions.queryKey, {
                    ...existingEmployee,
                    employee: [newEmployee, ...existingEmployee.employee],
                });

                toast("Employee Created", {
                    description: `Successfully created new employee: ${newEmployee.id}`,
                });
                // success state
            } catch (error) {
                // error state
                toast("Error", {
                    description: `Failed to create new employee`,
                });
            } finally {
                queryClient.setQueryData(loadingCreateEmployeeQueryOptions.queryKey, {});
            }
        },
    });

    return (
        <div className="p-2">
            <h2>Create Employee</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        void form.handleSubmit();
                    }}
                    className="flex flex-col gap-y-4 max-w-xl m-auto">
                    <form.Field
                        name="name"
                        validators={{
                            onChange: createEmployeeSchema.shape.name,
                        }}
                        children={(field) => (
                            <div>
                                <Label htmlFor={field.name}>Title</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.isTouched ? (
                                    <em>{field.state.meta.isTouched}</em>
                                ) : null}
                            </div>
                        )}
                    />

                    <form.Field
                        name="employeeid"
                        validators={{
                            onChange: createEmployeeSchema.shape.employeeid,
                        }}
                        children={(field) => (
                            <div>
                                <Label htmlFor={field.name}>Amount</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    type="number"
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.isTouched ? (
                                    <em>{field.state.meta.isTouched}</em>
                                ) : null}
                            </div>
                        )}
                    />
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button className="mt-4" type="submit" disabled={!canSubmit}>
                                {isSubmitting ? "..." : "Submit"}
                            </Button>
                        )}
                    />
                </form>

        </div>
    );
}
