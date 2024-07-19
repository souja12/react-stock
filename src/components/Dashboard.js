import React, { useState } from 'react';
import TradingViewWidget from './TradingViewWidget';
import MiniWidget from './MiniWidget';
import TechnicalAnalysisWidget from './TechnicalAnalysisWidget';

const Dashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('NSE:TATAMOTORS');

  const symbols = [
    { name: 'Apple', symbol: 'NASDAQ:AAPL' },
    { name: 'Google', symbol: 'NASDAQ:GOOGL' },
    { name: 'Microsoft', symbol: 'NASDAQ:MSFT' },
    { name: 'Tata Motors', symbol: 'NSE:TATAMOTORS' }
  ];

  return (
    <div>
      <section className="stats-cards">
        <div className="card">
          <MiniWidget id="tradingview_1" symbol="BSE:NIESSPA" />
        </div>
        <div className="card">
          <MiniWidget id="tradingview_2" symbol="GOOGL" />
        </div>
        <div className="card">
          <MiniWidget id="tradingview_3" symbol="MSFT" />
        </div>
        <div className="card">
          <MiniWidget id="tradingview_4" symbol="AMZN" />
        </div>
      </section>
      <section className="charts-section">
        <div className="chart">
          <h2>Current Stocks</h2>
          <TradingViewWidget />
        </div>
        <div className="design-tips">
          <h2>Select a symbol to see the meter</h2>
          <div className="symbol-tabs">
            {symbols.map(symbolObj => (
              <div
                key={symbolObj.symbol}
                className={`symbol-tab ${selectedSymbol === symbolObj.symbol ? 'active' : ''}`}
                onClick={() => setSelectedSymbol(symbolObj.symbol)}
              >
                {symbolObj.name}
              </div>
            ))}
          </div>
          <TechnicalAnalysisWidget symbol={selectedSymbol} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
