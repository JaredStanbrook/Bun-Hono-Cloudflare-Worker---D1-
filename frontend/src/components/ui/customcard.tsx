import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50",
                className
            )}
            {...props}>
            <div
                ref={ref}
                className={cn(
                    "absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-blue-50/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] ",
                    className
                )}
                {...props}></div>
            {children}
        </div>
    )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2",
                className
            )}
            {...props}
        />
    )
);
CardHeader.displayName = "CardHeader";

const CardImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, src, alt, loading = "lazy", width = 200, height = 48, decoding = "async", ...props }, ref) => (
      <img
          ref={ref}
          src={src}
          alt={alt}
          loading={loading}
          width={width}
          height={height}
          decoding={decoding}
          data-nimg="1"
          className={cn(
              "rounded border-2 border-slate-900/10 transition group-hover:border-slate-900/30 sm:order-1 sm:col-span-2 sm:translate-y-1",
              className
          )}
          style={{ color: "transparent" }}
          {...props}
      />
  )
);
CardImage.displayName = "CardImage";

const CardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement> & { href?: string }
>(({ className, href, children, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-medium leading-snug text-slate-900", className)} {...props}>
        {href ? (
            <a
                href={href}
                className={cn(
                    "inline-flex items-baseline font-medium leading-tight text-slate-900 hover:text-blue-500 focus-visible:text-blue-300 group/link text-base",
                    className
                )}>
                <span
                    className={cn(
                        "absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block",
                        className
                    )}></span>
                <span className={cn("inline-block", className)}>
                    {children}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" // You can adjust the height, width, and margin as needed
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true" // This hides the SVG from assistive technologies
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </a>
        ) : (
            children
        )}
    </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("mt-2 text-sm leading-normal", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("z-10 sm:col-span-6", className)} {...props} />
    )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, "aria-label": ariaLabel, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("mt-2 flex flex-wrap", className)}
            aria-label={cn("Technologies used", className)}
            {...props}
        />
    )
);
CardFooter.displayName = "CardFooter";

const CardItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
    ({ className, ...props }, ref) => (
        <li ref={ref} className={cn("mr-1.5 mt-2", className)} {...props}>
            <div
                className={cn(
                    "flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium leading-5 text-blue-400"
                )}>
                {props.children}
            </div>
        </li>
    )
);
CardItem.displayName = "CardItem";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    CardItem,
    CardImage,
};
