import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

// Here we'd have to define our routes manually, but also add them in the app/routes/ directory. NOTE: index() defines who takes the lead as the "/" directory (homepage/main page)
// Also, we can define "layout routes" here. Layout routes means assigning specific layouts depending on the route. For example, we can have a layout for the homepage only (i.e. <HomeLayout/>) and another for the rest of the pages (i.e. <MainLayout/>).
export default [
  layout("./layouts/home.tsx", [index("routes/home/index.tsx")]),
  layout("./layouts/main.tsx", [
    route("about", "routes/about/index.tsx"),
    route("projects", "routes/projects/index.tsx"),
    // Unlike NextJS (which requires a special naming for dynamic routing, like [id].tsx), we can name this however we want and structure it however we like (as in folder structure) since we explicitly define the routes here.
    route("projects/:id", "routes/projects/[id]/index.tsx"),
    route("blogs", "routes/blogs/index.tsx"),
    route("blogs/:slug", "routes/blogs/[slug]/index.tsx"),
    route("contact", "routes/contact/index.tsx"),
    // For any other page (i.e. not found), use the routes/errors/not-found.tsx
    route("*", "routes/errors/not-found.tsx"),
  ]),
] satisfies RouteConfig;
