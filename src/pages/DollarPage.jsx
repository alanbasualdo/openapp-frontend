export const DollarPage = () => {
  const iframeStyle = {
    width: "320px",
    height: "260px",
    borderRadius: "10px",
    boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "center",
    border: "1px solid #bcbcbc",
  };

  return (
    <div
      className="bg-white rounded-lg p-3 mt-2 d-flex justify-content-center gap-5"
      style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.7)" }}
    >
      <div>
        <iframe
          style={iframeStyle}
          src="https://dolarhoy.com/i/cotizaciones/dolar-blue"
          title="Dólar Blue"
        ></iframe>
      </div>
      <div>
        <iframe
          style={iframeStyle}
          src="https://dolarhoy.com/i/cotizaciones/dolar-bancos-y-casas-de-cambio"
          title="Dólar Oficial"
        ></iframe>
      </div>
    </div>
  );
};
