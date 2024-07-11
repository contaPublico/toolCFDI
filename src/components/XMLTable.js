import React from "react";
import { CSVLink } from "react-csv";

const XMLTable = ({ data }) => {
  const headers = [
    { label: "Receptor RFC", key: "ReceptorRFC" },
    { label: "RFC del Patrón", key: "RFC_patron" },
    { label: "Nombre Patrón", key: "Nombre_patron" },
    { label: "UUID", key: "UUID" },
    { label: "Versión Nómina", key: "Versión_nomina" },
    { label: "Fecha Emisión", key: "Fecha_emision" },
    { label: "Fecha Pago", key: "Fecha_pago" },
    { label: "Fecha Inicial Pago", key: "Fecha_inicial_pago" },
    { label: "Fecha Final Pago", key: "Fecha_final_pago" },
    { label: "Ejercicio", key: "Ejercicio" },
    { label: "Periodo", key: "Periodo" },
    { label: "Error de Timbrado", key: "Error_de_Timbrado" },
    { label: "Total Ingresos", key: "Total_ingresos" },
    { label: "Aguinaldo", key: "Exento_aguinaldo" },
    { label: "Prima Vacacional", key: "Exento_prima_vacacional" },
    { label: "PTU", key: "Exento_PTU" },
    { label: "Prima Dominical", key: "Exento_prima_dominical" },
    { label: "Otros ingresos Exentos", key: "Exento_otros_ingresos" },
    { label: "Total de ingreso Exentos", key: "Total_exentos" },
    { label: "Retención ISR", key: "Retencion_ISR" },
    { label: "Otra Deducciones", key: "Otras_deducciones" },
    { label: "Total Deducciones", key: "Total_deducciones" },
    { label: "Subsidio al Empleo Pagado", key: "Subsidio_pagado" },
    { label: "Subsidio al Empleo Causado", key: "Subsidio_causado" },
    { label: "Otros pagos", key: "Otros_otros_pagos" },
    { label: "Total Otros Pagos", key: "Total_otros_pagos" },
    { label: "Importe Neto", key: "Importe_neto" },
    { label: "Notas", key: "Notas" },
  ];

  return (
    <div>
      <div className="button-container">
        <CSVLink data={data} headers={headers} filename={"table-data.csv"}>
          <button>Descargar a Excel</button>
        </CSVLink>
      </div>
      <table>
        <thead>
          <tr>
            <th>Receptor RFC</th>
            <th>RFC del Patrón</th>
            <th>Nombre Patrón</th>
            <th>UUID</th>
            <th>Versión Nómina</th>
            <th>Fecha Emisión</th>
            <th>Fecha Pago</th>
            <th>Fecha Inicial Pago</th>
            <th>Fecha Final Pago</th>
            <th>Ejercicio</th>
            <th>Periodo</th>
            <th>Error de Timbrado</th>
            <th>Total Ingresos</th>
            <th>Aguinaldo</th>
            <th>Prima Vacacional</th>
            <th>PTU</th>
            <th>Prima Dominical</th>
            <th>Otros ingresos Exentos</th>
            <th>Total de ingreso Exentos</th>
            <th>Retención ISR</th>
            <th>Otra Deducciones</th>
            <th>Total Deducciones</th>
            <th>Subsidio Pagado</th>
            <th>Subsidio Causado</th>
            <th>Otros Pagos</th>
            <th>Total Otros Pagos</th>
            <th>Importe Neto</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          {data.map((file, index) => (
            <tr key={index}>
              <td>{file.ReceptorRFC}</td>
              <td>{file.RFC_patron}</td>
              <td>{file.Nombre_patron}</td>
              <td>{file.UUID}</td>
              <td>{file.Versión_nomina}</td>
              <td>{file.Fecha_emision}</td>
              <td>{file.Fecha_pago}</td>
              <td>{file.Fecha_inicial_pago}</td>
              <td>{file.Fecha_final_pago}</td>
              <td>{file.Ejercicio}</td>
              <td>{file.Periodo}</td>
              <td>{file.Error_de_Timbrado}</td>
              <td>{file.Total_ingresos}</td>
              <td>{file.Exento_aguinaldo}</td>
              <td>{file.Exento_prima_vacacional}</td>
              <td>{file.Exento_PTU}</td>
              <td>{file.Exento_prima_dominical}</td>
              <td>{file.Exento_otros_ingresos}</td>
              <td>{file.Total_exentos}</td>
              <td>{file.Retencion_ISR}</td>
              <td>{file.Otras_deducciones}</td>
              <td>{file.Total_deducciones}</td>
              <td> {file.Subsidio_pagado} </td>
              <td>{file.Subsidio_causado} </td>
              <td>{file.Otros_otros_pagos} </td>
              <td>{file.Total_otros_pagos} </td>
              <td>{file.Importe_neto}</td>
              <td>{file.Notas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default XMLTable;
