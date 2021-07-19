import "./App.css";
import FormularioCadastro from "./components/FormularioCadastro/";
import { CssBaseline, Container, Typography } from "@material-ui/core";
import 'fontsource-roboto';

function App() {
  return (
    <Container component="article" maxWidth="sm">
      <CssBaseline />
      <Typography variant="h3" component="h1" align="center">Formulário de cadastro</Typography>

      <FormularioCadastro onSubmit={onSubmitForm} />
    </Container>
  );
}

function onSubmitForm(dados)
{
  console.log(dados);
}

export default App;
