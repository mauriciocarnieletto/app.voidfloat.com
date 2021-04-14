import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export function ConfigurationPage() {
  return (
    <div>
      <h3>Bem vindo(a) ao módulo de configuração do sistema.</h3>
      <h4>Esta é uma área de risco, então, muito cuidado.</h4>
      <List>
        <ListItem button>
          <Link to='/configuration/server'>
            Configurações de servidor e rede.
          </Link>
        </ListItem>
        <ListItem button>
          <Link to='/configuration/parameters'>Parâmetros do sistema.</Link>
        </ListItem>
      </List>
    </div>
  );
}
