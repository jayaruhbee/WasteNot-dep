import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, Button, List, ListItem } from "@mui/material";
import api from "../utilities.jsx";

const DetailsCard = ({ id, open, onClose }) => {
  const [mealDetails, setMealDetails] = useState([]);
  let instructions = "";
  const distinctIngredients = [];

  useEffect(() => {
    const getMealDetails = async () => {
      try {
        const response = await api.get(`spoon/recipe/${id}/`);
        setMealDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMealDetails();
  }, []);


  if (mealDetails.instructions) {
    instructions = `<li>${mealDetails.instructions.replace(
      /\n/g,
      "<li>"
    )}</li>`;
  } 

  if (mealDetails.extendedIngredients) {
    for (const ingredient of mealDetails.extendedIngredients) {
      if (!distinctIngredients.some((el) => el.id === ingredient.id)) {
        distinctIngredients.push(ingredient);
      }
    }
  }

  

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", sm: "80%", md: "60%", lg: "40%" },
          maxHeight: "80%",
          overflowY: "auto",
          padding: "2rem",
          backgroundColor: "gray",
          color: "#fff",
          borderRadius: "16px",
          outline: "none",
        }}
      >
        {mealDetails && mealDetails.id && (
          <div>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", lg: "3rem" },
                textAlign: "center",
                textTransform: "capitalize",
                marginBottom: { xs: "1rem", lg: "2rem" },
                backgroundColor: "black",
                padding: "0.5rem 0",
                borderRadius: "8px",
              }}
            >
              {mealDetails.title}
            </Typography>
            <div>
              {instructions && (
             <Typography
             variant="h2"
             sx={{
               fontSize: 24,
               fontWeight: "bold",
               marginTop: 1,
             }}
           >
             Instructions:
           </Typography>
              )}
              {instructions && (
                <List
                  sx={{
                    listStyle: "decimal",
                    marginTop: 2,
                    marginLeft:2,
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: instructions }} />
                </List>
              )}
            </div>
            <Typography
              variant="h2"
              sx={{
                fontSize: 24,
                fontWeight: "bold",
                marginTop: 1,

              }}
            >
              Ingredients:
            </Typography>
            <List
              sx={{
                listStyleType: "disc",
                listStylePosition: "inside",
                marginTop: "16px",
              }}
            >
              {distinctIngredients &&
                distinctIngredients.map((ingredient, i) => (
                  <ListItem
                    sx={{
                      display: "list-item",
                      padding: "0",
                    }}
                    key={i}
                  >
                    {ingredient.amount} {ingredient.unit} -{" "}
                    {ingredient.nameClean.charAt(0).toUpperCase() +
                      ingredient.nameClean.slice(1)}
                  </ListItem>
                ))}
            </List>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                backgroundColor: "#68A2B1",
                ":hover": {
                  backgroundColor: "#8ED7EA",
                },
                display: "flex",
              }}
            >
              Close
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default DetailsCard;
