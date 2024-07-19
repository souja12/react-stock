import React, { useEffect } from 'react';

const MiniWidget = ({ id, symbol }) => {
  useEffect(() => {
    const loadScript = () => {
      const container = document.getElementById(id);
      if (!container) return;

      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbol": symbol,
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "dateRange": "12M",
        "colorTheme": "light",
        "isTransparent": false,
        "autosize": true,
        "largeChartUrl": ""
      });

      container.innerHTML = ''; // Clear previous content
      container.appendChild(script);
    };

    // Add a delay to ensure the DOM is fully ready
    const timeoutId = setTimeout(loadScript, 10);

    // Cleanup function to clear timeout if component unmounts
    return () => clearTimeout(timeoutId);
  }, [id, symbol]);

  return (
    <div className="tradingview-widget-container">
      <div id={id}></div>
    </div>
  );
};

export default MiniWidget;
