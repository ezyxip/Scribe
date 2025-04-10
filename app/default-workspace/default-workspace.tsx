import {
    Box,
    Card,
    CardContent,
    Grid2,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useMediaQuery,
    useTheme,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
} from "@mui/material";
import { useState, useEffect, useMemo, useCallback } from "react";
import type { CollectionProps } from "~/collections/collection-infra";

const DefaultWorkspace = (props: CollectionProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newNotebook, setNewNotebook] = useState({
        title: "",
        desctiprion: ""
    });
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    // Handle responsive view mode
    useEffect(() => {
        if (isSmallScreen) {
            setViewMode("grid");
        }
    }, [isSmallScreen]);

    // Filter notebooks based on search query
    const filteredNotebooks = useMemo(() => {
        if (!searchQuery) return props.notebooks;

        const query = searchQuery.toLowerCase();
        return props.notebooks.filter(
            (notebook) =>
                notebook.title.toLowerCase().includes(query) ||
                notebook.desctiprion.toLowerCase().includes(query)
        );
    }, [props.notebooks, searchQuery]);

    const handleViewModeChange = useCallback(
        (event: React.MouseEvent<HTMLElement>, newViewMode: "grid" | "table") => {
            if (newViewMode !== null) {
                setViewMode(newViewMode);
            }
        },
        []
    );

    const handleSearchChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(event.target.value);
        },
        []
    );

    const handleCreateClick = useCallback(() => {
        setIsCreateDialogOpen(true);
    }, []);

    const handleCreateDialogClose = useCallback(() => {
        setIsCreateDialogOpen(false);
        setNewNotebook({ title: "", desctiprion: "" });
    }, []);

    const handleCreateSubmit = useCallback(() => {
        props.createNotebook(newNotebook);
        handleCreateDialogClose();
    }, [newNotebook, props.createNotebook, handleCreateDialogClose]);

    const handleNewNotebookChange = useCallback(
        (field: keyof typeof newNotebook) => 
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewNotebook(prev => ({
                ...prev,
                [field]: event.target.value
            }));
        },
        []
    );

    return (
        <Box sx={{ p: 2 }}>
            {/* Search and View Controls */}
            <Stack spacing={2} sx={{ mb: 2 }}>
                {/* First row: Search and Add button on mobile */}
                <Box sx={{ 
                    display: 'flex', 
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search notebooks..."
                        size="small"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{
                            flexGrow: 1,
                            backgroundColor: "background.paper",
                        }}
                        fullWidth={isSmallScreen}
                    />
                    
                    {isSmallScreen && (
                        <Button
                            variant="contained"
                            onClick={handleCreateClick}
                            fullWidth
                        >
                            Add Notebook
                        </Button>
                    )}
                </Box>

                {/* Second row: View toggle and Add button on desktop */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewModeChange}
                        aria-label="view mode"
                        size="small"
                    >
                        <ToggleButton
                            value="grid"
                            aria-label="grid view"
                            disabled={isSmallScreen}
                        >
                            <Typography>Table</Typography>
                        </ToggleButton>
                        <ToggleButton
                            value="table"
                            aria-label="table view"
                            disabled={isSmallScreen}
                        >
                            <Typography>List</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {!isSmallScreen && (
                        <Button
                            variant="contained"
                            onClick={handleCreateClick}
                        >
                            Add Notebook
                        </Button>
                    )}
                </Box>
            </Stack>

            {/* Rest of the component remains the same */}
            {/* Content */}
            {viewMode === "grid" ? (
                <Grid2 container spacing={2}>
                    {filteredNotebooks.map((notebook) => (
                        <Grid2
                            key={notebook.id}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4,
                                lg: 3,
                            }}
                            sx={{ display: "flex" }}
                        >
                            <Card sx={{ width: "100%" }}>
                                <CardContent>
                                    <Typography variant="h6" noWrap>
                                        {notebook.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            height: "60px",
                                        }}
                                    >
                                        {notebook.desctiprion}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            mt: 2,
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                props.updateNotebook(notebook)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                props.deleteNotebook(
                                                    notebook.id
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredNotebooks.map((notebook) => (
                                <TableRow key={notebook.id}>
                                    <TableCell>
                                        <Typography fontWeight="medium">
                                            {notebook.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {notebook.desctiprion}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                props.updateNotebook(notebook)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                props.deleteNotebook(
                                                    notebook.id
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Empty state */}
            {filteredNotebooks.length === 0 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "200px",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" color="text.secondary">
                        {searchQuery
                            ? "No notebooks match your search"
                            : "No notebooks available"}
                    </Typography>
                </Box>
            )}

            {/* Create Notebook Dialog */}
            <Dialog open={isCreateDialogOpen} onClose={handleCreateDialogClose}>
                <DialogTitle>Create New Notebook</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
                        <TextField
                            autoFocus
                            label="Title"
                            fullWidth
                            value={newNotebook.title}
                            onChange={handleNewNotebookChange("title")}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={newNotebook.desctiprion}
                            onChange={handleNewNotebookChange("desctiprion")}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateDialogClose}>Cancel</Button>
                    <Button 
                        onClick={handleCreateSubmit}
                        disabled={!newNotebook.title.trim()}
                        variant="contained"
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DefaultWorkspace;