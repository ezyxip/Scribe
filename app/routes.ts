import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("./theme/theme-wrapper.tsx", [
        index("./routes/home.tsx"),
        route("/dev", "dev/dev.tsx"),
    ])
] satisfies RouteConfig;
