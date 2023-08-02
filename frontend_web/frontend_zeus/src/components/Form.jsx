import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";


const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Label = styled.label``;

const Form = ({ getAllPurchases, onEdit, setOnEdit  }) => {
  
  return (
    <FormContainer >
      <InputArea>
        <Label>Brand Name</Label>
        <Input brand_name="brand_name" />
      </InputArea>
      <InputArea>
        <Label>Price</Label>
        <Input price="price" />
      </InputArea>
      <InputArea>
        <Label>Weight(g)</Label>value
        <Input weight_grams="weight_grams" />
      </InputArea>

      <Button type="submit">CONFIRM</Button>
    </FormContainer>
  );
};

export default Form;
