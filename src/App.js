import React, { useState } from 'react';
import { Container, AppBar, Card, CardMedia, CardContent, Typography, makeStyles, Button, CircularProgress } from '@material-ui/core';
import '@fontsource/roboto';

function App() {
	const [users, setUsers] = useState([])
	const [loader, setLoader] = useState(false);;

	const loadUsers = () => {
		setLoader(true);
		(async () => {
			const response = await fetch("https://reqres.in/api/users?page=1");
			const JSONres = await response.json();
			setUsers(JSONres.data);
			console.log(users);
			setLoader(false);
		})()
	}

	const useStyles = makeStyles ({
		image: {
			height: "400px",
			minWidth: "400px",
		},
		flex: {
			display: "grid",
			gridTemplateColumns: "auto auto auto"
		},
		padding: {
			padding: '5%',
		}
	});

	const classes = useStyles ();
  return (
		<>
			<AppBar position='static'>
				<Typography variant='h2' color='#673ab7' align='center' className={classes.padding}>LetsGrowMore Users</Typography>
			</AppBar>
			
			<center className={classes.padding}>
				<Typography variant='h3'>Click "Get Users" to load users!</Typography>
				<br />
				<Button variant='contained' color='secondary' onClick={loadUsers}>Get users</Button>
				<br />
				<br />
				{
				loader === true ? <CircularProgress /> : console.log("loader false")
				}
			</center>
			<Container>
				<div className={classes.flex}>
					{
					users.map ((user) => (
						<Card key={user.id}>

							<CardMedia
								className={classes.image}
								image = {user.avatar} 
								title = {user.first_name}
							/>

							<CardContent>
								<Typography>{user.first_name + " " + user.last_name}</Typography>
								<Typography>{user.email}</Typography>
							</CardContent>

						</Card>
					))
					}
				</div>
			</Container>
		</>
	);
}

export default App;