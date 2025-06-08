import React, { useState } from 'react';
import qrImage from '../pictures/usdt-trc20-qr.png';

const QrDetails = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-start items-center z-50 px-4">
      <div className="bg-[#1E293B] p-6 rounded-2xl shadow-lg flex items-center max-w-sm w-full relative">
        <img
          src={qrImage}
          alt="USDT QR Code"
          className="w-40 h-40 object-contain rounded-lg border-2 border-cyan-500 shadow-cyan-500/40"
        />
        <div className="ml-4 text-white hidden sm:block">
          <h2 className="text-lg font-semibold mb-2">USDT (TRC20)</h2>
          <p className="text-sm text-gray-300">Scan to Pay</p>
        </div>

        {/* Next Button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute bottom-3 right-4 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-4 py-1 rounded-lg transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QrDetails;
