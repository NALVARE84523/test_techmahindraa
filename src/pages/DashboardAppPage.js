import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
import { AppCurrentVisits, AppWebsiteVisits } from "../sections/@dashboard/app";

const getUrlDateVisits = "http://localhost:3000/dateVisits";
const getUrlRegisteredUsers = "http://localhost:3000/registeredUsers";
const getUrlCurrentVisits = "http://localhost:3000/currentVisits";

export default function DashboardAppPage() {
  const [dataComplete, setDataComplete] = useState(false);
  const [dateState, setDateState] = useState([]);
  const [registeredUsersState, setRegisteredUsersState] = useState([]);
  const [currentVisitsState, setCurrentVisitsState] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  const fetchData = async () => {
    try {
      const responseDateVisits = await axios.get(getUrlDateVisits);
      const responseRegisteredUsers = await axios.get(getUrlRegisteredUsers);
      const responseCurrentVisit = await axios.get(getUrlCurrentVisits);
      setRegisteredUsersState(responseRegisteredUsers.data);
      setCurrentVisitsState(responseCurrentVisit.data);
      responseDateVisits.data.map((date1) => {
        setDateState((prevArray) => [...prevArray, date1.date]);
      });
      if (responseDateVisits.status === 200 && responseRegisteredUsers.status === 200 && responseCurrentVisit.status === 200) {
        setDataComplete(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("Email")) {
      navigate("/", { replace: true });
      return;
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hola, Bienvenido a tech mahindra
      </Typography>
      {dataComplete ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Usuarios actuales"
              subheader="(+43%) que el año pasado"
              chartLabels={dateState}
              chartData={registeredUsersState}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Visitas actuales"
              chartData={currentVisitsState}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
