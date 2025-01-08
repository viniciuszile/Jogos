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
    const url = `https://raw.githubusercontent.com/viniciuszile/Jogos/main/Data/jogos.xlsx?${new Date().getTime()}`;

  
    const carregarArquivo = async () => {
      const response = await fetch(url, { cache: 'no-cache' });
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
  
      console.log("Dados carregados: ", jsonData);
      setData(jsonData);
      setFilteredData(jsonData); // Aplique o filtro aqui, se necessário
    };
  
    carregarArquivo();
  }, []);  // Recarregar os dados sempre que a página for carregada
  
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

  // Ordena os dados por nome
  const ordenarPorNome = (data) => {
    return data.sort((a, b) => {
      const nomeA = a["Nome do Jogo"].toLowerCase(); // Nome do Jogo é agora uma chave
      const nomeB = b["Nome do Jogo"].toLowerCase();
      return nameOrder === "asc" ? nomeA.localeCompare(nomeB) : nomeB.localeCompare(nomeA);
    });
  };

  // Filtra os dados com base nos filtros aplicados
  const aplicarFiltros = () => {
    let dadosFiltrados = data; // Usar todos os dados

    // Filtra por plataforma
    if (platformFilter !== "todos") {
      dadosFiltrados = dadosFiltrados.filter((linha) => linha["Plataforma"].toLowerCase() === platformFilter);
    }

    // Filtra por status
    if (statusFilter !== "todos") {
      dadosFiltrados = dadosFiltrados.filter((linha) => linha["Status"].toLowerCase() === statusFilter);
    }

    // Filtra por objetivo
    if (goalFilter !== "todos") {
      dadosFiltrados = dadosFiltrados.filter((linha) => linha["Objetivo"].toLowerCase() === goalFilter);
    }

    // Ordena por nome
    dadosFiltrados = ordenarPorNome(dadosFiltrados);

    setFilteredData(dadosFiltrados);
  };

  // Aplica os filtros sempre que algum filtro ou os dados mudarem
  useEffect(() => {
    aplicarFiltros();
  }, [platformFilter, statusFilter, goalFilter, nameOrder, data]);

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
            {platformFilter === "todos" ? "Todas" : platformFilter.toUpperCase()}
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
                <button onClick={() => filtrarObjetivo("platinado")}>Platinados</button>
                <button onClick={() => filtrarObjetivo("platinando")}>Platinando</button>
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

      <div className="container_table">
        <table>
          <thead>
            <tr>
              <th>Nome do Jogo</th>
              <th>Status</th>
              <th>Plataforma</th>
              <th>Objetivo</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((linha, index) => (
              <tr key={index}>
                <td>{linha["Nome do Jogo"]}</td>
                <td>{linha["Status"]}</td>
                <td>{linha["Plataforma"]}</td>
                <td>{linha["Objetivo"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
