import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import "./new_games.css";  // Certifique-se de que o CSS está sendo importado corretamente

const NewGames = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const url = "https://raw.githubusercontent.com/viniciuszile/Jogos/main/novosjogos.xlsx"; // URL para o novo arquivo Excel

    const carregarArquivo = async () => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Usando a primeira aba
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Processar os dados conforme necessário
      const processedData = jsonData.slice(1).map((row) => {
        const dateExcelFormat = row[2];
        const formattedDate = new Date(1900, 0, dateExcelFormat - 1);
        const readableDate = formattedDate.toLocaleDateString();

        return {
          nome: row[0],
          plataforma: row[1],
          dataInicio: readableDate,
          situacao: row[3],
          motivo: row[4],
        };
      });

      setData(processedData);
      setFilteredData(processedData);
    };

    carregarArquivo();
  }, []);

  const handleNavigationHome = () => {
    navigate("/"); // Navega de volta para a Home
  };

  return (
    <div className="container_newgames">
      <h1>Novos Jogos</h1>

      <div className="container_btn">
        <button className="tn_home" onClick={handleNavigationHome}>Ir para Home</button>
      </div>

      <div className="container_tabela">
        <table>
          <thead>
            <tr>
              <th>Nome do Jogo</th>
              <th>Plataforma</th>
              <th>Data Início</th>
              <th>Situação</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="5">Nenhum jogo encontrado.</td>
              </tr>
            ) : (
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.nome}</td>
                  <td>{row.plataforma}</td>
                  <td>{row.dataInicio}</td>
                  <td>{row.situacao}</td>
                  <td>{row.motivo}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewGames;
