import React, { useEffect, useState } from "react";
import axios from "axios";

interface Ticket {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: number;
  status: number;
}

const Tickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://192.168.224.128/mid/tickets");
        setTickets(response.data.tickets);
      } catch (error) {
        console.error("Erro ao buscar tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  // Ordenar os tickets por prioridade (do maior para o menor)
  const sortedTickets = tickets.sort((a, b) => b.prioridade - a.prioridade);

  // Função para resolver um ticket
  const resolverTicket = async (ticketId: number) => {
    try {
      await axios.put(`http://192.168.224.128/mid/tickets/${ticketId}`, {
        status: 2,
      });
      // Atualizar o estado local para refletir a mudança
      setTickets(
        tickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: 2 } : ticket
        )
      );
    } catch (error) {
      console.error("Erro ao resolver ticket:", error);
    }
  };

  return (
    <div>
      <h1>Tickets</h1>
      <ul>
        {sortedTickets.map((ticket) => (
          <li key={ticket.id}>
            <h2>{ticket.titulo}</h2>
            <p>{ticket.descricao}</p>
            <p>Prioridade: {ticket.prioridade}</p>
            <p>Status: {ticket.status}</p>
            <button onClick={() => resolverTicket(ticket.id)}>
              Resolver Ticket
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tickets;
