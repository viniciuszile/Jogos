import React, { useState, useEffect } from "react";
import "./home.css";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Filtros
  const [platformFilter, setPlatformFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [goalFilter, setGoalFilter] = useState("todos");
  const [nameOrder, setNameOrder] = useState("asc");

  useEffect(() => {
    const url = `https://raw.githubusercontent.com/viniciuszile/Jogos/main/jogos.xlsx?${new Date().getTime()}`;

    const carregarArquivo = async () => {
      const response = await fetch(url, { cache: 'no-cache' });
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      console.log("Dados carregados: ", jsonData);
      setData(jsonData);
      setFilteredData(jsonData);
    };

    carregarArquivo();
  }, []);  // Recarregar os dados sempre que a página for carregada

  // Função para limpar o cache manualmente
  const limparCache = () => {
    // Limpar o cache localStorage ou sessionStorage
    localStorage.clear(); // Ou sessionStorage.clear();
    console.log("Cache limpo!");
  };

  // Controle da visibilidade da modal
  const abrirModal = (filterType) => {
    setActiveFilter(filterType);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setActiveFilter("");
  };

  // Filtros de plataforma, status, objetivo e nome
  const filtrarPlataforma = (plataforma) => {
    setPlatformFilter(plataforma);
    fecharModal();
  };

  const filtrarStatus = (status) => {
    setStatusFilter(status);
    fecharModal();
  };

  const filtrarObjetivo = (objetivo) => {
    setGoalFilter(objetivo);
    fecharModal();
  };

  const filtrarNome = (ordem) => {
    setNameOrder(ordem);
    fecharModal();
  };

  // Navegação
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navega para o caminho fornecido
  };

  return (
    <div className="container_home">
      <h1>Lista de Jogos</h1>

      <div className="container_btn">
        <div>
          <label>Filtrar Nome</label>
          <button onClick={() => abrirModal("nome")}>
            {nameOrder === "asc" ? "A a Z" : "Z a A"}
          </button>
        </div>

        <div>
          <label>Filtrar Status</label>
          <button onClick={() => abrirModal("status")}>
            {statusFilter === "todos" ? "Todos" : statusFilter}
          </button>
        </div>

        <div>
          <label>Filtrar Plataforma</label>
          <button onClick={() => abrirModal("plataforma")}>
            {platformFilter === "todos"
              ? "Todas"
              : platformFilter.toUpperCase()}
          </button>
        </div>

        <div>
          <label>Filtrar Objetivo</label>
          <button onClick={() => abrirModal("objetivo")}>
            {goalFilter === "todos" ? "Todos" : goalFilter}
          </button>
        </div>

        <div>
          <label>Conferir</label>
          <button onClick={() => handleNavigation("/graficos")}>
            Gráficos
          </button>
        </div>

        <div>
          <label>Conferir</label>
          <button onClick={() => handleNavigation("/newgames")}>
            New Games
          </button>
        </div>

        {/* Botão para limpar cache */}
        <div>
          <button onClick={limparCache}>Limpar Cache</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Filtrar por {activeFilter}</h2>

            {activeFilter === "plataforma" && (
              <div>
                <button onClick={() => filtrarPlataforma("todos")}>Todas</button>
                <button onClick={() => filtrarPlataforma("pc")}>PC</button>
                <button onClick={() => filtrarPlataforma("ps4")}>PS4</button>
                <button onClick={() => filtrarPlataforma("ps3")}>PS3</button>
                <button onClick={() => filtrarPlataforma("ps5")}>PS5</button>
              </div>
            )}

            {activeFilter === "status" && (
              <div>
                <button onClick={() => filtrarStatus("todos")}>Todos</button>
                <button onClick={() => filtrarStatus("zerado")}>Zerados</button>
                <button onClick={() => filtrarStatus("incompleto")}>
                  Incompletos
                </button>
              </div>
            )}

            {activeFilter === "objetivo" && (
              <div>
                <button onClick={() => filtrarObjetivo("todos")}>Todos</button>
                <button onClick={() => filtrarObjetivo("platina")}>
                  Platinado
                </button>
                <button onClick={() => filtrarObjetivo("concluído")}>
                  Concluído
                </button>
                <button onClick={() => filtrarObjetivo("zerar")}>Zerar</button>
              </div>
            )}

            {activeFilter === "nome" && (
              <div>
                <button onClick={() => filtrarNome("asc")}>A a Z</button>
                <button onClick={() => filtrarNome("desc")}>Z a A</button>
              </div>
            )}

            <button onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}

      <h1>Tabela de Jogos</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Nome do Jogo</th>
            <th>Status</th>
            <th>Plataforma</th>
            <th>Objetivo</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
