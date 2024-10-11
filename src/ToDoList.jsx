import React, { useEffect, useState } from "react";
import "./ToDoList.css";
import Icon from "./assets/icon.webp";

function ToDoList() {
  const listaStorage = localStorage.getItem("Lista");

  const [lista, setLista] = useState(
    listaStorage ? JSON.parse(listaStorage) : []
  );
  const [novoItem, setNovoItem] = useState([]);

  useEffect(() => {
    localStorage.setItem("Lista", JSON.stringify(lista));
  }, [lista]);

  function adicionaItem(form) {
    form.preventDefault();
    if (!novoItem) {
      return;
    }
    setLista([...lista, { text: novoItem, isCompleted: false }]);
    setNovoItem("");
    document.getElementById("input-entrada").focus();
    document.getElementById("input-entrada").value = "";
  }

  function clicou(index) {
    const listaAux = [...lista];
    listaAux[index].isCompleted = !listaAux[index].isCompleted;
    setLista(listaAux);
  }

  function deleta(index) {
    const listaAux = [...lista];
    listaAux.splice(index, 1);
    setLista(listaAux);
  }

  function deletaTodas() {
    setLista([]);
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={adicionaItem}>
        <input
          id="input-entrada"
          type="text"
          placeholder="Adiciona uma tarefa"
          onChange={(e) => {
            setNovoItem(e.target.value);
          }}
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>
      <div className="lista-tarefas">
        <div style={{ textAlign: "center" }}>
          {lista.length < 1 ? (
            <img className="icone-central" src={Icon} />
          ) : (
            lista.map((item, index) => (
              <div
                key={index}
                className={item.isCompleted ? "Item completo" : "item"}
              >
                <span
                  onClick={() => {
                    clicou(index);
                  }}
                >
                  {item.text}
                </span>
                <button
                  onClick={() => {
                    deleta(index);
                  }}
                  className="dell"
                >
                  Deletar
                </button>
              </div>
            ))
          )}
          {lista.length > 0 && (
            <button
              onClick={() => {
                deletaTodas();
              }}
              className="delete-all"
            >
              Deletar todas
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
