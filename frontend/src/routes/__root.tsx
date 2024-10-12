import { createRootRouteWithContext, Link, Outlet, Navigate } from "@tanstack/react-router";
//import { Toaster } from "@/components/ui/sonner"
import { type QueryClient } from "@tanstack/react-query";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

interface MyRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: Root,
    //component: () => <Navigate to="/about"/>
});

function NavBar() {
    return (
        <div className="p-2 flex justify-between max-w-2xl m-auto items-baseline">
            <Link to="/">
                <h1 className="text-2xl font-bold">Employee Tracker</h1>
            </Link>
            <div className="flex gap-2">
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
                <Link to="/employee" className="[&.active]:font-bold">
                    Employee
                </Link>
                <Link to="/create-employee" className="[&.active]:font-bold">
                    Create
                </Link>
                <Link to="/profile" className="[&.active]:font-bold">
                    Profile
                </Link>
            </div>
        </div>
    );
}
//<NavBar />
function Root() {
    return (
        <>
            <Navigate to="/about"/>
            <Outlet />
        </>
    );
}
