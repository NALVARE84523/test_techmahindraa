import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

const getUrl = 'http://localhost:3000/userLogin';

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  
  const handleClick = async () => {
    try {
      const response = await axios.get(getUrl);
      response.data.map((user) => {
        if(user.email === userEmail && user.password === userPassword) {
          setShowError(false);
          localStorage.setItem("Email", userEmail);
          navigate('/dashboard', { replace: true });
        }
        if(user.email !== userEmail || user.password !== userPassword) {
          setShowError(true);
        }
      })
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={userPassword} 
          onChange={(e) => setUserPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ my: 2 }} onClick={handleClick}>
        Login
      </LoadingButton>
      {showError && (
        <p style={{color: 'red'}}>Correo o contraseña incorrectas</p>
      )}
    </>
  );
}
