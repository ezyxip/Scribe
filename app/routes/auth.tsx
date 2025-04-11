import { Box, Grid2, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { addAuthProvider, useAuthProviders } from "~/auth-infra/auth-infra";

export default function AuthScreen() {
    const authProviders = useAuthProviders();
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Преобразуем объект провайдеров в массив для стабильного порядка
    const providers = Object.entries(authProviders);
    const currentProvider = providers[tabValue]?.[1];

    return (
        <Grid2
            container
            sx={{ width: "100%", height: "95vh" }}
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
            gap={3}
        >
            <Typography variant="h4">Войти в систему</Typography>
            <Grid2
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    
                >
                    {providers.map(([name]) => (
                        <Tab key={name} label={name} />
                    ))}
                </Tabs>
                <Box sx={{ height: "2em" }} />
                {currentProvider && <currentProvider.render onLogin={()=>{}}/>}
            </Grid2>
        </Grid2>
    );
}