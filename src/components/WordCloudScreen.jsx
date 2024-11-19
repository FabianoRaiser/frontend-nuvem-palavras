import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

function WordCloudScreen() {
  const svgRef = useRef();
  const [words, setWords] = useState([]);

  useEffect(() => {
    // Função para buscar palavras
    const fetchWords = async () => {
      try {
        const response = await fetch('https://api-nuvem-palavras.onrender.com/api/palavras');
        const data = await response.json();
        setWords(data);
        console.log('Palavras atualizadas:', data);
      } catch (error) {
        console.error('Erro ao buscar palavras:', error);
        setWords([
          { text: "Erro ao pegar palavras", size: 10 }
        ]);
      }
    };

    // Executa fetchWords imediatamente
    fetchWords();

    // Configura o intervalo para executar a cada minuto (60000 ms)
    const interval = setInterval(fetchWords, 60000);

    // Cleanup: remove o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []); // Array de dependências vazio para executar apenas na montagem

  // Configuração do layout da nuvem
  const layout = cloud()
    .size(window.innerWidth <= 768 ? [300, 400] : [1000, 800])
    .words(words)
    .padding(5)
    .rotate(() => (~~(Math.random() * 2) * 90))
    .fontSize(d => d.size)
    .on("end", draw);

  // Função para desenhar as palavras
  function draw(words) {
    // Limpa o SVG anterior se existir
    d3.select(svgRef.current).selectAll("*").remove();

    // Cria o novo SVG
    const svg = d3.select(svgRef.current)
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
      .append("g")
      .attr("transform", `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`);

    // Adiciona as palavras
    svg.selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", d => `${d.size}px`)
      .style("font-family", "Arial")
      .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
      .attr("text-anchor", "middle")
      .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .text(d => d.text);
  }

  // Inicia o layout
  layout.start();

  return (
    <div>
      <div className="word-cloud-container">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}

export default WordCloudScreen;
