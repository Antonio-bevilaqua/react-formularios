import { validadorCPF } from "./validadorCpf";

function validateTextRequired(text) {
  if (text === "") {
    return {
      valido: false,
      label: true,
      texto: "Este campo é requerido!",
      validation: validateTextRequired,
    };
  }

  return {
    valido: true,
    label: false,
    texto: "",
    validation: validateTextRequired,
  };
}

function validateTextCPF(text) {
  let validate1 = validateTextRequired(text);
  if (!validate1.valido) {
    let retorno = validate1;
    retorno.validation = validateTextCPF;
    return retorno;
  }

  if (!validadorCPF(text)) {
    return {
      valido: false,
      label: true,
      texto: "CPF inválido!",
      validation: validateTextCPF,
    };
  }

  let retorno = validate1;
  retorno.validation = validateTextCPF;
  return retorno;
}

export { validateTextRequired, validateTextCPF };
