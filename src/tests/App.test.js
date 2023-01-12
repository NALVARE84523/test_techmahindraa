import { render, screen } from "@testing-library/react";
import App from "../App";

test('<App /> Inicio de sesion funciona correctamente', () => {
  render(<App />);
  expect(screen.getByText("Hola, Bienvenido")).toBeInTheDocument();
})