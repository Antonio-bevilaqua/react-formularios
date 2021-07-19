import React from "react";
import { mascaraCPF } from "../../validators/validadorCpf.js";
import { validateTextCPF, validateTextRequired } from "../../validators/validateText.js";
import { fieldValidate, formValidate, formIsValid } from "../../validators/formValidation.js";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  TextField,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  display: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  checkboxes: {
    marginRight: "0px",
  },
}));

function FormularioCadastro({ onSubmit }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [promocoes, setPromocoes] = useState(true);
  const [novidades, setNovidades] = useState(true);
  const [erros, setErros] = useState({
    nome: {
      valido: false,
      label: false,
      texto: "",
      validation: validateTextRequired,
    },
    sobrenome: {
      valido: false,
      label: false,
      texto: "",
      validation: validateTextRequired,
    },
    cpf: {
      valido: false,
      label: false,
      texto: "",
      validation: validateTextCPF,
    },
  });
  const classes = useStyles();

  function fieldIsValid(key, value) {
    let newErrors = fieldValidate(key, value, erros);
    setErros(newErrors);
  }

  function formValidation() {
    let newErrors = formValidate(erros, {nome: nome, sobrenome: sobrenome, cpf: cpf});
    setErros(newErrors);
  }

  function formValid() {
    formValidation();
    return formIsValid(erros);
  }

  return (
    <form
      autoComplete="off"
      className={classes.display}
      noValidate="noValidate"
      onSubmit={(event) => {
        event.preventDefault();
        if (formValid()) {
          onSubmit({
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            promocoes: promocoes,
            novidades: novidades,
          });
        }
      }}
    >
      <FormControl fullWidth className={classes.margin}>
        <TextField
          value={nome}
          onChange={(event) => {
            setNome(event.target.value);
            fieldIsValid("nome", event.target.value);
          }}
          label="Nome:"
          variant="outlined"
          required
          id="nome"
          helperText={erros.nome.texto}
          error={erros.nome.label}
        />
      </FormControl>

      <FormControl fullWidth className={classes.margin}>
        <TextField
          value={sobrenome}
          onChange={(event) => {
            setSobrenome(event.target.value);
            fieldIsValid("sobrenome", event.target.value);
          }}
          label="Sobrenome:"
          variant="outlined"
          required
          id="sobrenome"
          helperText={erros.sobrenome.texto}
          error={erros.sobrenome.label}
        />
      </FormControl>

      <FormControl fullWidth className={classes.margin}>
        <TextField
          label="CPF:"
          value={cpf}
          onChange={(event) => {
            let newCPF = event.target.value;
            newCPF = mascaraCPF(newCPF);
            setCpf(newCPF);
            fieldIsValid("cpf", newCPF);
          }}
          variant="outlined"
          required
          id="cpf"
          helperText={erros.cpf.texto}
          error={erros.cpf.label}
        />
      </FormControl>

      <div className={classes.checkBoxRow}>
        <FormControlLabel
          control={
            <Checkbox
              checked={promocoes}
              onChange={(event) => {
                setPromocoes(event.target.checked);
              }}
              id="promocoes"
              value="promocoes"
              inputProps={{ "aria-label": "Promoções" }}
              color="primary"
            />
          }
          className={classes.checkboxes}
          label="Quero receber promoções!!"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={novidades}
              onChange={(event) => {
                setNovidades(event.target.checked);
              }}
              id="novidades"
              value="novidades"
              inputProps={{ "aria-label": "Novidades" }}
              color="primary"
            />
          }
          className={classes.checkboxes}
          label="Quero saber das novidades!!"
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.margin}
      >
        Cadastrar
      </Button>
    </form>
  );
}

export default FormularioCadastro;
