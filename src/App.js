import * as pdfjsLib from "pdfjs-dist/webpack.mjs";
import { useEffect, useRef } from "react";

const pdfPath = "./dummy.pdf";

export const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const viewPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfPath);
      const pdfDocument = await loadingTask.promise;
      // Request a first page
      const pdfPage = await pdfDocument.getPage(1);
      // Display page on the existing canvas with 100% scale.
      const viewport = pdfPage.getViewport({ scale: 1.0 });
      const canvas = canvasRef.current;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      const renderTask = pdfPage.render({
        canvasContext: ctx,
        viewport,
      });
      await renderTask.promise;
    };
    viewPdf();
  }, []);

  return <canvas ref={canvasRef} />;
};
