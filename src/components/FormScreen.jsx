import { useState } from "react";

function FormScreen() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api-nuvem-palavras.onrender.com/api/palavras",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Adicione outros headers necessários, como autorização
            // 'Authorization': 'Bearer seu_token'
          },
          body: JSON.stringify({
            // Você pode ajustar a estrutura do objeto conforme necessário
            palavra: inputValue,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar dados");
      }

      const data = await response.json();
      console.log("Resposta da API:", data);

      // Limpa o input após sucesso
      setInputValue("");
    } catch (err) {
      setError("Ocorreu um erro ao enviar os dados: " + err.message);
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.trimEnd();
    setInputValue(value);
  };

  return (
    <div>
      <h1>
        Registre em uma palavra o sentimento de integrar este grande time que é o
        coração pedagógico da educação de Joinville
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          placeholder="Palavra"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !inputValue.trim()}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default FormScreen;
