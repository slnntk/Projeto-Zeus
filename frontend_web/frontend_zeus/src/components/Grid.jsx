import React, { useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify"; // feadback

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ purchases }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (purchaseId) => {
    await axios
      .delete("http://localhost:3000/" + purchaseId)
      .then(({ data }) => {
        const newArray = purchases.filter(
          (purchase) => purchase.purchaseId !== purchaseId
        );

        setPurchases(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Brand Name</Th>
          <Th>Price</Th>
          <Th>Weight(g)</Th>
          <Th>Purchase Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        {purchases.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.brand_name}</Td>
            <Td width="30%">{item.price}</Td>
            <Td width="30%">{item.weight_grams}</Td>
            <Td width="30%">{item.instant}</Td>
            {/* bloquear mobile */}
            <Td width="20$" onlyWeb>
              {item.fone}
            </Td>
            {/* icons de edição alinhados com o centro */}
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            {/* icons de exclusão alinhados com o centro */}
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
