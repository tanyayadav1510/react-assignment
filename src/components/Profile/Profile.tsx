import { Avatar, Typography } from '@mui/material';
import profileStyles from './ProfileStyles';

export const Profile = () => {
  return (
    <div style={profileStyles.container}>
      <div style={profileStyles.avatarContainer}>
        <Avatar
          alt="Remy Sharp"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          style={profileStyles.avatar}
        />
      </div>
      <div style={profileStyles.textContainer}>
        <Typography style={profileStyles.name}>Remy Sharp</Typography>
        <Typography style={profileStyles.location}>Bangalore, Karnataka</Typography>
      </div>
    </div>
  );
};
