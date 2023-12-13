// React & Redux Imports
import React from 'react';
import { useSelector } from 'react-redux';

// MUI imports 
import {  Dialog, DialogContent, Typography, Container, Paper, Avatar, Divider, Box } from '@mui/material';

const ProfilePage = ({ open, setOpen }) => {

  const user = useSelector(state => state.auth.user);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogContent>
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                alt="User Avatar"
                src={user?.profile_pic ?? null}
                sx={{ width: 80, height: 80, backgroundColor: 'green' }}
              />
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                {`${user?.user_first_name ?? ''} ${user?.user_last_name}`}
              </Typography>
              <Typography variant="body1" sx={{ color: 'green' }}>
                {user?.user_email ?? ''}
              </Typography>
              <Divider sx={{ width: '100%', my: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                <Typography variant="subtitle1">
                  User Type: {user?.user_type}
                </Typography>
                <Typography variant="subtitle1">
                  Phone: {user?.user_mobile_number}
                </Typography>
              </Box>
            </Paper>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfilePage;
