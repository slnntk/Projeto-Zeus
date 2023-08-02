import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.jsx";
import Grid from "./components/Grid.jsx";
import axios from "axios";
import { useEffect } from "react";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-itemns: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [purchases, setPurchases] = useState([]);
  const [onEdit, setOnEdit] = useState([null]);

  const getAllPurchases = async () => {
    try {
      const res = await axios.get("http://localhost:3000/purchases/");
      setPurchases(
        res.data.sort((object1, object2) => {
          const date1 = new Date(object1.instant);
          const date2 = new Date(object2.instant);
          if (date1 < date2) {
            return -1;
          } else if (date1 > date2) {
            return 1;
          } else {
            return object2.price - object1.price;
          }
        })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllPurchases();
  }, [setPurchases]);

  return (
    <>
      <Title>Purcheses</Title>

      <Form
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getAllPurchases={getAllPurchases}
        purchases={purchases}
      />
      <Grid
        setOnEdit={setOnEdit}
        purchases={purchases}
        setPurchases={setPurchases}
      />
      <Container></Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
