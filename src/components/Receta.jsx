import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Receta = ({ receta }) => {
  // Configuración del modal De MUI
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Extraer los valores del context
  const { informacion, guardarIdReceta, guardarReceta } =
    useContext(ModalContext);

  // Muestra y formatea los ingredientes
  const mostrarIngredientes = (informacion) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (informacion[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}
          </li>
        );
      }
    }

    return ingredientes;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>
        <img
          className="card-img-top"
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
        />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              guardarIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            Ver Receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              guardarReceta({});
              guardarIdReceta(null);
              handleClose();
            }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {informacion.strDrink}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {informacion.strInstructions}
              </Typography>
              <img className="img-fluid my-4" src={informacion.strDrinkThumb} />
              <h4>Ingredientes y cantidades</h4>
              <ul>
                <li>{mostrarIngredientes(informacion)}</li>
              </ul>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
