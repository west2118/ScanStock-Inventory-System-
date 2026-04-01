import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

type Props = {
  handleSelectProduct: (product: any) => void;
  cameraOn: boolean;
};

const ScanScannerArea = ({ handleSelectProduct, cameraOn }: Props) => {
  useEffect(() => {
    if (!cameraOn) return;

    const scanner = new Html5Qrcode("reader");

    scanner
      .start(
        { facingMode: "environment" }, // 📱 back camera
        {
          fps: 10,
          qrbox: 250,
        },
        async (decodedText) => {
          console.log("Scanned:", decodedText);

          // 🔥 call backend
          const res = await fetch(`/api/products/${decodedText}`);
          const data = await res.json();

          handleSelectProduct(data);
        },
        (error) => {
          console.log(error);
        },
      )
      .catch((err) => console.log(err));

    // 🧹 cleanup when camera OFF
    return () => {
      scanner.stop().then(() => scanner.clear());
    };
  }, [cameraOn]);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div id="reader" className="w-full"></div>
    </div>
  );
};

export default ScanScannerArea;
