import * as Plot from "../../_npm/@observablehq/plot@0.6.14/_esm.js";
import * as d3 from "../../_npm/d3@7.9.0/_esm.js";


export function plotHearingGroupTicks(data, criteria, {width}) {

    const newSubset = data.filter(d => (d.criteria === criteria));

    const plot = Plot.plot({
        width,
        height: 250,
        marginLeft: 20,
        marginRight: 20,
        color: {scheme: "Tableau10"},
        y: {label: "", tickSize: 0},
        fy: {domain: ["LF", "MF", "HF", "PW"], label: null},
        x: {
            axis: "top",
            grid: true,
            label: "% of population",
          },
        marks:[
          Plot.barX(newSubset, {
            x1: 0,
            x2: d3.max(newSubset.map(d => d.percentAbundance))*1.05,
            y: "sch",
            insetTop: 2,
            insetBottom: 2,
            fy: "hearingGroup",
            fill: "gainsboro",
          }),
          Plot.tickX(newSubset,
                     {
                       x: "percentAbundance",
                       y: "sch",
                       fy: "hearingGroup",
                       stroke: "sch",
                       strokeWidth: 2,
                       channels: {"Hearing group": "hearingGroup", Species: "species"},
                       tip: {format: {fill: false, x: false, y: false, fy: false}},
                     }
                    )
        ]
      });

    return plot;
}


export function plotHearingGroups(data, criteria, {width}) {
    const subset = data.filter(d => (d.criteria === criteria));
    
    const plot = Plot.plot({
        width: width,
        height: 250,
        x: {
          axis: "top",
          grid: true,
          label: "% of population",
        },
        y: {
            label: null,
            axis: null,
        },
        fy: {
            label: null,
            domain: ["LF", "MF", "HF", "PW"]
        },
        color: {scheme: "Tableau10"},
        marks: [
          Plot.barX(subset, {
            x1: "min",
            x2: "max",
            y: "sch",
            fy: "hearingGroup",
            fill: "sch",
          }),
          Plot.tickX(subset, {
            x: "mean",
            y: "sch",
            fy: "hearingGroup",
            strokeWidth: 2,
          })
        ]
      });

    return plot;
}

export function plotScheduleCompare(data, criteria, attenuation, shortName, { width }) {
    const subset = data.filter(d => (d.criteria === criteria) & (d.attenuation === attenuation) & (d.shortName === shortName));

    const plot = Plot.plot({
        //title: `${criteria} exposures`,
        marginLeft: 60,
        width: width,
        height: 175,
        color: { scheme: "Tableau10", legend: false },
        y: {
            grid: true,
            label: "% of population",
        },
        x: { label: null, transform: (d) => "Sch " + d },
        marks: [
            Plot.barY(subset, { x: "sch", y: "percentAbundance", fill: "sch" }),
            Plot.text(subset, {
                x: "sch", y: "percentAbundance",
                text: (d) => (d.percentAbundance > 0.1) ? (d.percentAbundance.toFixed(1)) : "<0.1",
                dy: 15, fill: "white", lineAnchor: "bottom", fontSize: 14, fontWeight: "bold"
            }),
            Plot.ruleY([0])
        ]
    });

    return plot;

}

export function plotSpread(data, criteria, attenuation, { width }) {
    const subset = data.filter(d => (d.criteria === criteria) & (d.attenuation === attenuation));
    return Plot.plot({
        // title: `All species: predicted ${criteria} exposures`,
        // subtitle: "Predicted exposures as a percentage of species regional abundance.",
        height: 300,
        width: width,
        marginLeft: 120,
        x: { axis: "top", grid: true, label: "% of population" },
        y: { label: null },
        color: { scheme: "Tableau10", legend: true },
        marks: [
            Plot.ruleX([0]),
            Plot.ruleY(subset, Plot.groupY(
                {
                    x1: (D) => d3.min(D),
                    x2: (D) => d3.max(D)
                },
                {
                    y: "shortName",
                    x1: "percentAbundance",
                    x2: "percentAbundance",
                    strokeWidth: 2,
                    sort: { y: "-x2" },
                },
            )),
            Plot.dot(subset,
                {
                    y: "shortName",
                    x: "percentAbundance",
                    fill: "sch",
                    r: 5,
                }),
        ]
    });
}
