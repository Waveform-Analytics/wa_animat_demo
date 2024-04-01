import * as Inputs from "npm:@observablehq/inputs";

export function arrayToTable(data, criteria, attenuation, {width}) {
    const subset = data.filter(d => (d.criteria === criteria) & (d.attenuation === attenuation));
    const tidy = subset.reduce((acc, { shortName, sch, percentAbundance }) => {
      if (!acc[shortName]) {
        acc[shortName] = { shortName };
      }
      acc[shortName][sch] = percentAbundance;
      return acc;
    }, {});
  
    const tableData = Object.values(tidy);
  
    return Inputs.table(tableData, 
      {
        format: {
        A: (x) => x >= 0.1 ? x.toFixed(1) : "<0.1",
        B: (x) => x >= 0.1 ? x.toFixed(1) : "<0.1",
        C: (x) => x >= 0.1 ? x.toFixed(1) : "<0.1",
        D: (x) => x >= 0.1 ? x.toFixed(1) : "<0.1",
        },
        header: {
          shortName: "Species",
          A: "Sch A",
          B: "Sch B",
          C: "Sch C",
          D: "Sch D",
        },
        width: {width, shortName: 150,},
        height: 225,
        multiple: false,
        value: tableData[0],
        required: true,
        reverse: true,
      }
    );
  }
  

  // This one isn't working right... I basically wanted a custom table that was not interactive
  export function arr2Table2(arr, criteria, attenuation) {

    const subset = arr.filter(d => (d.criteria === criteria) & (d.attenuation === attenuation));
    const tidy = subset.reduce((acc, { shortName, sch, exposures }) => {
      if (!acc[shortName]) {
        acc[shortName] = { shortName };
      }
      acc[shortName][sch] = exposures;
      return acc;
    }, {});
  
    const data = Object.values(tidy);
  
    const headers = Object.keys(data[0]);
  
    let tableHtml = html`<table>`;
    
    // Create table headers
    tableHtml = html`${tableHtml}<tr>`;
    headers.forEach(header => {
      tableHtml = html`${tableHtml}<th>${header}</th>`;
    });
    tableHtml = html`${tableHtml}</tr>`;
    
    // Populate table rows
    data.forEach(item => {
      tableHtml = html`${tableHtml}<tr>`;
      headers.forEach(header => {
        tableHtml = html`${tableHtml}<td>${item[header]}</td>`;
      });
      tableHtml = html`${tableHtml}</tr>`;
    });
  
    tableHtml = html`${tableHtml}</table>`;
    
    return tableHtml;
  }