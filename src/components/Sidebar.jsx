import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const Sidebar = ({ onChangeView, currentView }) => (
    <Box sx={{ width: '20vw', color: 'black', bgcolor: 'white', p: 2 }}>
        <List>
            {['Register Patients', 'Run Query'].map((text) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => onChangeView(text)}
                        selected={currentView === text}
                        sx={{
                            borderRadius: 2,
                            '& .MuiListItemText-primary': {
                                fontWeight: 'bold',
                            },
                            '&.Mui-selected': {
                                bgcolor: 'grey.300',
                                '&:hover': {
                                    bgcolor: 'grey.400',
                                },
                            },
                        }}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Box>
);

export default Sidebar;
