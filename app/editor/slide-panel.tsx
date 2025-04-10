import { Box, Slide, useTheme } from "@mui/material";

interface SlidePanelProps {
    isOpen: boolean;
    children: React.ReactNode;
    height?: string;
    animationDuration?: number;
  }
  
  const SlidePanel: React.FC<SlidePanelProps> = ({
    isOpen,
    children,
    height = 200,
    animationDuration = 150,
  }) => {
    const theme = useTheme();
    return (
      <Slide
        direction="down"
        in={isOpen}
        timeout={animationDuration}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: height,
            boxShadow: 3,
            zIndex: 1200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {children}
        </Box>
      </Slide>
    );
  };
  
  export default SlidePanel;
  