import Router from './routes';
import ThemeProvider from './theme';
import { StyledChart } from './components/chart';

export default function App() {

  return (
    <ThemeProvider>
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
