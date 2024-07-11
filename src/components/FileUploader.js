import React, { useState } from "react";
import XMLTable from "./XMLTable";
import { parseString } from "xml2js";
import "./FileUploader.css"; // Asegúrate de importar el archivo CSS

const FileUploader = () => {
  const [parsedFiles, setParsedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
  
    function sumarValores(objeto) {

      if (objeto){


  
      return Object.values(objeto).reduce((acumulador, valor) => {
        // Convertir el valor a número y sumarlo al acumulador
        return acumulador + parseFloat(valor);
      }, 0);
      }
      else{
        return 0;
      }
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        parseString(e.target.result, (err, result) => {
          if (err) {
            console.error("Error parsing XML", err);
          } else {
            console.log(result); // borrar solo para ver los datos en la consola
            const comprobante = result["cfdi:Comprobante"];

            if (comprobante.$.TipoDeComprobante === "N" ){
              if (comprobante) {
                const emisor = comprobante["cfdi:Emisor"]
                  ? comprobante["cfdi:Emisor"][0]
                  : null;
                const receptor = comprobante["cfdi:Receptor"]
                  ? comprobante["cfdi:Receptor"][0]
                  : null;
  
                const timbre = comprobante["cfdi:Complemento"][0]["tfd:TimbreFiscalDigital"]
                  ? comprobante["cfdi:Complemento"][0]["tfd:TimbreFiscalDigital"][0]
                  : null;
  
                  const nomina = comprobante["cfdi:Complemento"][0]["nomina12:Nomina"]
                  ? comprobante["cfdi:Complemento"][0]["nomina12:Nomina"][0]
                  : null;
  
                  const precepciones = comprobante["cfdi:Complemento"][0]["nomina12:Nomina"][0]["nomina12:Percepciones"]
                  ? comprobante["cfdi:Complemento"][0]["nomina12:Nomina"][0]["nomina12:Percepciones"]
                  : null;

                  let Lista_precepciones = [];

                  if (precepciones!=null) {
                    Lista_precepciones = precepciones[0]["nomina12:Percepcion"]
                    ? precepciones[0]["nomina12:Percepcion"]
                    : [];
                    }
  
                  const deducciones = comprobante["cfdi:Complemento"][0]["nomina12:Nomina"][0]["nomina12:Deducciones"]
                  ? comprobante["cfdi:Complemento"][0]["nomina12:Nomina"][0]["nomina12:Deducciones"]
                  : null;
  
                  let Lista_deducciones = [];
  
                  if(deducciones!=null){
                      Lista_deducciones = deducciones[0]["nomina12:Deduccion"]
                      ? deducciones[0]["nomina12:Deduccion"]
                      : [];
                    }
  
  
                    const otros_pagos_xml = comprobante["cfdi:Complemento"][0]["nomina12:Nomina"][0]["nomina12:OtrosPagos"]
                    ?comprobante["cfdi:Complemento"][0]["nomina12:Nomina"][0]["nomina12:OtrosPagos"]
                    :null;
  
                  let lista_otros_pagos = [];
  
                  if(otros_pagos_xml!=null){
                      lista_otros_pagos = comprobante["cfdi:Complemento"][0]["nomina12:Nomina"][0]["nomina12:OtrosPagos"][0]["nomina12:OtroPago"]
                      ? comprobante["cfdi:Complemento"][0]["nomina12:Nomina"][0]["nomina12:OtrosPagos"][0]["nomina12:OtroPago"]
                      : [];
                    }
                  
                    let subsidio_causado = 0;
  
                    try {

                      for (let index = 0; index < lista_otros_pagos.length; index++) {
                        
                        try {
                          subsidio_causado += parseFloat(lista_otros_pagos[index]["nomina12:SubsidioAlEmpleo"][0].$.SubsidioCausado ,0)
                        } catch (error) {
                          
                        }
                        
                      }

                    } catch (error) {
                      
                    }
  
  
                const receptorRFC = receptor ? receptor["$"].Rfc : "N/A";
                const rfc_patron = emisor ? emisor["$"].Rfc : "N/A";
                const nombre_patron = emisor ? emisor["$"].Nombre : "N/A";
                const uuid = timbre ? timbre["$"].UUID : "N/A";
                const versión_nomina =nomina ? nomina["$"].Version : "N/A";
                const fecha_emision =comprobante ? comprobante["$"].Fecha :"N/A"
                const fecha_pago = nomina ? nomina["$"].FechaPago : "N/A";
                const fecha_inicial_pago = nomina ? nomina["$"].FechaInicialPago : "N/A";
                const fecha_final_pago = nomina ? nomina["$"].FechaFinalPago : "N/A";
                const ejercicio = fecha_pago.slice(0,4);
                const periodo = fecha_pago.slice(5,7);
                const error_de_timbrado = timbre ? "NO" : "SI";
                const total_ingresos = nomina ? parseFloat(nomina["$"].TotalPercepciones) : 0;
                const exento_aguinaldo = Lista_precepciones.filter(item => item.$.TipoPercepcion === "002").reduce((total, item) => total + parseFloat(item.$.ImporteExento), 0) ;
                const exento_prima_vacacional = Lista_precepciones.filter(item => item.$.TipoPercepcion === "021").reduce((total, item) => total + parseFloat(item.$.ImporteExento), 0);
                const exento_ptu = Lista_precepciones.filter(item => item.$.TipoPercepcion === "003").reduce((total, item) => total + parseFloat(item.$.ImporteExento), 0);
                const exento_prima_dominical = Lista_precepciones.filter(item => item.$.TipoPercepcion === "020").reduce((total, item) => total + parseFloat(item.$.ImporteExento), 0);
                const exento_otros_ingresos = Lista_precepciones.reduce((total, item) => total + parseFloat(item.$.ImporteExento), 0) - exento_aguinaldo - exento_prima_dominical - exento_prima_vacacional - exento_ptu ;
                const total_exentos =precepciones ? parseFloat(precepciones[0].$.TotalExento) : 0;
                const retencion_isr =  Lista_deducciones.filter(item => item.$.TipoDeduccion === "002").reduce((total, item) => total + parseFloat(item.$.Importe), 0);
                const otras_deducciones = Lista_deducciones.reduce((total, item) => total + parseFloat(item.$.Importe), 0) - retencion_isr;
                const total_deducciones = deducciones ? sumarValores(deducciones[0]["$"]) : 0  ;
                const subsidio_pagado = lista_otros_pagos.filter(item => item.$.TipoOtroPago === "002").reduce((total, item) => total + parseFloat(item.$.Importe), 0);
                const otros_otros_pagos = lista_otros_pagos.filter(item => item.$.TipoOtroPago !== "002").reduce((total, item) => total + parseFloat(item.$.Importe), 0);
                const total_otros_pagos = subsidio_pagado + otros_otros_pagos
                const importe_neto = parseFloat(comprobante.$.Total,0)
                const notas = "Tipo de nomina: "+ comprobante["cfdi:Complemento"][0]["nomina12:Nomina"][0].$.TipoNomina
  
                console.log(uuid);
                console.log(retencion_isr);
                console.log(subsidio_causado);
                console.log(subsidio_pagado);
                setParsedFiles((prev) => [
                  ...prev,
                  {
                    ReceptorRFC: receptorRFC,
                    RFC_patron: rfc_patron,
                    Nombre_patron: nombre_patron,
                    UUID: uuid,
                    Versión_nomina: versión_nomina,
                    Fecha_emision: fecha_emision,
                    Fecha_pago: fecha_pago,
                    Fecha_inicial_pago: fecha_inicial_pago,
                    Fecha_final_pago: fecha_final_pago,
                    Ejercicio: ejercicio,
                    Periodo: periodo,
                    Error_de_Timbrado: error_de_timbrado,
                    Total_ingresos: total_ingresos,
                    Exento_aguinaldo: exento_aguinaldo,
                    Exento_prima_vacacional: exento_prima_vacacional,
                    Exento_PTU: exento_ptu,
                    Exento_prima_dominical: exento_prima_dominical,
                    Exento_otros_ingresos: exento_otros_ingresos,
                    Total_exentos: total_exentos,
                    Retencion_ISR: retencion_isr,
                    Otras_deducciones: otras_deducciones,
                    Total_deducciones: total_deducciones,
                    Subsidio_pagado:subsidio_pagado,
                    Subsidio_causado:subsidio_causado,
                    Otros_otros_pagos :otros_otros_pagos,
                    Total_otros_pagos: total_otros_pagos,
                    Importe_neto: importe_neto,
                    Notas: notas,
                  },
                ]);
              }
            }
          }
        });
      };
      reader.readAsText(file);
    });
  };

  const handleClearData = () => {
    setParsedFiles([]);
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        accept=".xml"
        multiple
        onChange={handleFileUpload}
        className="file-input"
      />
      {parsedFiles.length > 0 && (
        <>
          <XMLTable data={parsedFiles} />
          <button className="clear-button" onClick={handleClearData}>
            Borrar Datos
          </button>
        </>
      )}
    </div>
  );
};

export default FileUploader;
