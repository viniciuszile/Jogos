import React, { useState, useEffect } from "react";
import "./graficos.css"
import { Pie } from "react-chartjs-2"; // Importando o gráfico de pizza
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Registrando os componentes do Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default function Graficos() {
  const navigate = useNavigate();
  const [platformData, setPlatformData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  
  const handleNavigationHome = () => {
    navigate("/"); // Navega de volta para a Home
  };
  useEffect(() => {
    // Dados de exemplo (substitua com dados reais do seu arquivo Excel ou API)
    const dadosPlataforma = {
      labels: ["PS4", "PS3", "PC"], // Exemplo de plataformas
      datasets: [
        {
          label: "Jogos por Plataforma",
          data: [30, 20, 50], // Quantidade de jogos
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          borderWidth: 1,
        },
      ],
    };

    

    const dadosStatus = {
      labels: ["Platinados", "Incompletos", "Concluídos"], // Status dos jogos
      datasets: [
        {
          label: "Status dos Jogos",
          data: [15, 20, 25], // Quantidade de jogos em cada status
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          borderWidth: 1,
        },
      ],
    };

    // Atualizando o estado com os dados
    setPlatformData(dadosPlataforma);
    setStatusData(dadosStatus);
  }, []);

  return (
    <div className="graficos-container">
      <h2>Gráficos de Jogos</h2>

      <button className="btn_home" onClick={handleNavigationHome}>Ir para Home</button>

      {/* Gráfico de plataformas */}
      <div className="grafico-container">
        <h3>Jogos por Plataforma</h3>
        {platformData.labels && platformData.datasets ? (
          <Pie data={platformData} options={{ responsive: true }} />
        ) : (
          <p>Carregando dados...</p>
        )}
      </div>

      {/* Gráfico de status dos jogos */}
      <div className="grafico-container">
        <h3>Status dos Jogos</h3>
        {statusData.labels && statusData.datasets ? (
          <Pie data={statusData} options={{ responsive: true }} />
        ) : (
          <p>Carregando dados...</p>
        )}
      </div>
    </div>
  );
}
