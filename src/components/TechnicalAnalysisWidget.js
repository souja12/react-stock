import React, { useEffect, useRef } from 'react';

const TechnicalAnalysisWidget = ({ symbol }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const loadScript = () => {
      const widgetContainer = document.getElementById('tradingview-widget');
      if (widgetContainer) {
        widgetContainer.innerHTML = '';
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
          interval: "1m",
          width: 585,
          isTransparent: false,
          height: 350,
          symbol: symbol,
          showIntervalTabs: true,
          displayMode: "single",
          locale: "en",
          colorTheme: "light"
        });
        widgetContainer.appendChild(script);
      }
    };

    // Add a delay to ensure the DOM is fully ready
    const timeoutId = setTimeout(loadScript, 10);

    // Cleanup function to clear timeout if component unmounts
    return () => clearTimeout(timeoutId);
  }, [symbol]);

  return (
    <div id="tradingview-widget" className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TechnicalAnalysisWidget;
