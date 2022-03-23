import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const theme = createTheme();

export default function Login() {

   const [values, setValues] = useState({
				amount: '',
				password: '',
				weight: '',
				weightRange: '',
				showPassword: false,
			});


	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});
	};

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container component='main' sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(/images/banner-login.jpg)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Acessar plataforma
						</Typography>
						<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: 400}}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='E-mail'
								name='email'
								placeholder='Digite seu e-mail'
								autoComplete='email'
								autoFocus
                sx={{mb: 2}}
							/>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                  placeholder='Digite sua senha'
                />
              </FormControl>
							<FormControlLabel
								control={<Checkbox value='remember' color='primary' />}
								label='Lembrar-me'
                sx={{mt: 1}}
							/>
							<Button
								type='submit'
								fullWidth
                size='large'
								variant='contained'
								sx={{ mt: 3, mb: 2 }}>
								Entrar
							</Button>
							<Grid container sx={{ mb: 4 }}>
								<Grid item xs textAlign={'end'}>
									<Link href='#' variant='body2'>
										Esqueceu sua senha?
									</Link>
								</Grid>
							</Grid>
              <Grid container>
              <Grid item xs textAlign={'center'}>
                  Não possui uma conta? {' '}
									<Link href='#' variant='body2'>
										 {'Cadastre-se'}
									</Link>
								</Grid>
              </Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
