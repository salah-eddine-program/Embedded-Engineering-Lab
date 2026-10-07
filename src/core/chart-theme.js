export function lineChartOptions(gridColor = 'rgba(128, 140, 130, 0.18)') {
  const chartFont = document.documentElement.lang === 'ar' ? 'Noto Sans Arabic' : 'IBM Plex Mono';
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 300 },
    interaction: { mode: 'index', intersect: false },
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#18201b', titleFont: { family: chartFont, size: 10 }, bodyFont: { family: chartFont, size: 10 }, padding: 10, cornerRadius: 6 } },
    scales: {
      x: { grid: { display: false }, border: { display: false }, ticks: { color: '#88928a', maxTicksLimit: 7, font: { family: 'IBM Plex Mono', size: 9 } } },
      y: { grid: { color: gridColor }, border: { display: false }, ticks: { color: '#88928a', maxTicksLimit: 5, font: { family: 'IBM Plex Mono', size: 9 } } },
    },
  };
}
