import React, { useState } from "react";
import axios from "axios";

const MakerTickets: React.FC = () => {
  const [ticket, setTicket] = useState({
    titulo: "",
    descricao: "",
    prioridade: 1,
    id_pessoa: 0,
    status: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]:
        name === "prioridade" || name === "id_pessoa" || name === "status"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.224.128:80/mid/tickets",
        ticket
      );
      console.log("Ticket criado:", response.data);
      // Limpar o formulário ou redirecionar após a criação bem-sucedida
      setTicket({
        titulo: "",
        descricao: "",
        prioridade: 1,
        id_pessoa: 0,
        status: 0,
      });
      alert("Ticket criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar ticket:", error);
      alert("Erro ao criar ticket. Por favor, tente novamente.");
    }
  };

  return (
    <div className="maker-tickets-container">
      <h2>Criar Novo Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={ticket.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={ticket.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="prioridade">Prioridade:</label>
          <select
            id="prioridade"
            name="prioridade"
            value={ticket.prioridade}
            onChange={handleChange}
          >
            <option value={1}>Baixa</option>
            <option value={2}>Média</option>
            <option value={3}>Alta</option>
          </select>
        </div>
        <div>
          <label htmlFor="id_pessoa">ID da Pessoa:</label>
          <input
            type="number"
            id="id_pessoa"
            name="id_pessoa"
            value={ticket.id_pessoa}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={ticket.status}
            onChange={handleChange}
          >
            <option value={0}>Aberto</option>
            <option value={1}>Em Andamento</option>
            <option value={2}>Concluído</option>
          </select>
        </div>
        <button type="submit">Criar Ticket</button>
      </form>
    </div>
  );
};

export default MakerTickets;
