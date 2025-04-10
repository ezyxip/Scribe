import {
    type RouteConfig,
    index,
    layout,
    route,
} from "@react-router/dev/routes";

export default [
    layout("./theme/theme-wrapper.tsx", [
        layout("./user/user-context.tsx", [
            layout("./cell/cell-infra.tsx", [
                layout("./cell/cell-registrator.tsx", [
                    index("./routes/home.tsx"),
                    route("/dev", "dev/dev.tsx"),
                    layout("./auth-infra/auth-infra.tsx", [
                        layout("./auth-infra/auth-registrator.tsx", [
                            route("/auth", "routes/auth.tsx"),
                        ]),
                    ]),
                ]),
            ]),
        ]),
    ]),
] satisfies RouteConfig;
