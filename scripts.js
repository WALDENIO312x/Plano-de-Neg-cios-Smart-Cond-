document.addEventListener('DOMContentLoaded', () => {
    // Cores dos gráficos
    const chartColors = {
        primary: '#007BFF',
        secondary: '#56A8FF',
        tertiary: '#89C4FF',
        accent: '#004AAD',
        light: '#BCE0FF',
        text: '#333'
    };

    // Função auxiliar para quebrar linhas no título do tooltip (para gráficos)
    const tooltipTitleCallback = (tooltipItems) => {
        const item = tooltipItems[0];
        let label = item.chart.data.labels[item.dataIndex];
        if (Array.isArray(label)) {
            return label.join(' ');
        }
        return label;
    };

    // Função auxiliar para quebrar labels longos em múltiplas linhas
    const wrapLabel = (label, maxWidth = 16) => {
        if (label.length <= maxWidth) {
            return label;
        }
        const words = label.split(' ');
        const lines = [];
        let currentLine = '';
        for (const word of words) {
            if ((currentLine + ' ' + word).trim().length > maxWidth) {
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                }
                currentLine = word;
            } else {
                currentLine = (currentLine + ' ' + word).trim();
            }
        }
        if (currentLine.length > 0) {
            lines.push(currentLine);
        }
        return lines.length > 0 ? lines : [label];
    };

    /*
    * Gráfico Radar (Análise Competitiva)
    */
    const radarCtx = document.getElementById('radarChart')?.getContext('2d');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Conveniência', 'Preço', 'Agilidade', 'Segurança', 'Variedade'].map(l => wrapLabel(l)),
                datasets: [
                    {
                        label: 'Nosso Mercado',
                        data: [10, 8, 10, 10, 7],
                        backgroundColor: 'rgba(0, 123, 255, 0.2)',
                        borderColor: chartColors.primary,
                        pointBackgroundColor: chartColors.primary
                    },
                    {
                        label: 'Supermercado',
                        data: [5, 9, 4, 6, 10],
                        backgroundColor: 'rgba(0, 74, 173, 0.2)',
                        borderColor: chartColors.accent,
                        pointBackgroundColor: chartColors.accent
                    },
                    {
                        label: 'Delivery App',
                        data: [8, 7, 7, 9, 9],
                        backgroundColor: 'rgba(137, 196, 255, 0.2)',
                        borderColor: chartColors.tertiary,
                        pointBackgroundColor: chartColors.tertiary
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: { callbacks: { title: tooltipTitleCallback } },
                    legend: { position: 'bottom', labels: { boxWidth: 12 } }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        grid: { color: '#e0e0e0' },
                        angleLines: { color: '#e0e0e0' },
                        pointLabels: { font: { size: 12, weight: '600' } }
                    }
                }
            }
        });
    }

    /*
    * Gráfico Donut (Alocação do Investimento)
    */
    const donutCtx = document.getElementById('donutChart')?.getContext('2d');
    if (donutCtx) {
        new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Equipamentos (R$ 6k)', 'Estrutura (R$ 5k)', 'Produtos (R$ 5k)', 'Capital de Giro (R$ 5k)'].map(l => wrapLabel(l)),
                datasets: [{
                    data: [6000, 5000, 5000, 5000],
                    backgroundColor: [chartColors.accent, chartColors.primary, chartColors.secondary, chartColors.light],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: { callbacks: { title: tooltipTitleCallback } },
                    legend: { position: 'bottom' }
                },
                cutout: '60%'
            }
        });
    }

    /*
    * Gráfico de Barras (Projeção Mensal)
    */
    const barCtx = document.getElementById('barChart')?.getContext('2d');
    if (barCtx) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Faturamento Bruto', 'Custo Mensal', 'Lucro Líquido'].map(l => wrapLabel(l)),
                datasets: [{
                    label: 'Valor (R$)',
                    data: [17000, 11900, 5100],
                    backgroundColor: [chartColors.secondary, chartColors.accent, chartColors.primary],
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { title: tooltipTitleCallback } }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => `R$ ${value / 1000}k`
                        }
                    }
                }
            }
        });
    }

    /*
    * Gráfico de Linha (Projeção Crescimento)
    */
    const lineCtx = document.getElementById('lineChart')?.getContext('2d');
    if (lineCtx) {
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
                datasets: [{
                    label: 'Lucro Líquido (R$)',
                    data: [5100, 5200, 5350, 5500, 5700, 6000, 6200, 6400, 6600, 6800, 7000, 7200],
                    borderColor: chartColors.primary,
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { title: tooltipTitleCallback } }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: (value) => `R$ ${value / 1000}k`
                        }
                    }
                }
            }
        });
    }
});
