import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("./routes/home.tsx"),
    layout("./theme/theme-wrapper.tsx", [
        route("/dev", "dev/dev.tsx"),
        
    ])
] satisfies RouteConfig;
