---
toc: false
---

<h1>Offshore Wind Noise Exposures</h1>


This dashboard explores a demo dataset describing the number of animals predicted to be impacted in some way from offshore construction noise. __The dataset is totally fake__ but it is in fact based on real datasets that are used to inform offshore wind permitting decisions. All of the exposures have been scaled to 


```js
import {plotScheduleCompare, plotSpread, plotHearingGroups, plotHearingGroupTicks} from "./components/plots.js";
import {arrayToTable} from "./components/tables.js";
import {groupAndSummarizeTwoKeys, groupAndSummarizeThreeKeys, groupArr} from "./components/tools.js";

```

<style type="text/css">

@container (min-width: 560px) {
  .grid-cols-2-3 {
    grid-template-columns: 1fr 1fr;
  }
  .grid-cols-2-3 .grid-colspan-2 {
    grid-column: span 2;
  }
}

@container (min-width: 840px) {
  .grid-cols-2-3 {
    grid-template-columns: 1fr 2fr;
    grid-auto-flow: column;
  }
}

</style>


<div class="grid grid-cols-3">


  <div class="card grid-colspan-2" >
  <h2> Predicted exposures by species</h2>
  Select a species to display details in summary plots below.

  ${criteriaInput2}

  ${speciesTableInput}
  
  </div>

  <div class="card">

  <h2>Summary exposures by hearing group</h2>
  Low frequency (LF), mid frequency (MF), high frequency (HF), and phocid pinnipeds in water (PW).

  ${criteriaInput3}

  ${resize((width) =>plotHearingGroupTicks(subsetTenDb, criteriaPick3, {width}))}
  
  </div>


</div>

<div class="grid grid-cols-2-3">
  <div class="card">
  <h2>Behavioral exposures: % of population</h2>
  <h2>${longNameLookup(speciesTablePick["shortName"])}</h2>
  ${resize((width) => plotScheduleCompare(demoExposureData, "behavior", 10, speciesTablePick["shortName"],{width}))}</div>

  <div class="card">
  <h2>Injury exposures: % of population</h2>
  <h2>${longNameLookup(speciesTablePick["shortName"])}</h2>
  ${resize((width) => plotScheduleCompare(demoExposureData, "injury", 10, speciesTablePick["shortName"],{width}))}</div>

  <div class="card grid-colspan-2 grid-rowspan-2" style="display: flex; flex-direction: column;">
  <h2>Predicted exposures for different schedules</h2>
  Predicted number of animals exposed to sounds that might cause either injury or behavioral disturbance. Different schedules are compared.

  ${criteriaInput}

  ${resize((width) => plotSpread(demoExposureData, criteriaPick, 10, {width}))}
  
  </div>
</div>


```js
// Load datasets
const demoExposureData = FileAttachment("data/demo-exposure-data2.csv").csv({typed: true});
const speciesInfo = FileAttachment("data/species-info.csv").csv({typed: true})

```

```js
// Combine datasets
const speciesMap = demoExposureData.map(
  expItem => speciesInfo.find(specItem => specItem.species === expItem.species))

// Add the abundance column from the speciesInfo array to the demoExposureData array
const newAbundanceColumn = speciesMap.map(item => item.abundance)
demoExposureData.map((item, i) => item.abundance = newAbundanceColumn[i])

// Add the hearing group column from speciesInfo array
const newHearingGroupColumn = speciesMap.map(item => item.hearing_group)
demoExposureData.map((item, i) => item.hearingGroup = newHearingGroupColumn[i])

// Add short names 
const newShortNamesColumn = speciesMap.map(item => item.shortName)
demoExposureData.map((item, i) => item.shortName = newShortNamesColumn[i])

// Compute percent abundance
demoExposureData.map(item => item.percentAbundance = 100 * item.exposures / item.abundance)

```

```js
function longNameLookup(shortName) {
  return speciesMap.find(item => item.shortName === shortName)["species"];
}

```


```js
// Species Pick input
const uniqueSpecies = [...new Set(demoExposureData.map(d => d.species))];
const speciesInput = Inputs.select(uniqueSpecies, 
{ 
  label: "Select species:",
});
const speciesPick = Generators.input(speciesInput);

```

```js
// Criteria Pick input
const criteriaInput = Inputs.select(["injury", "behavior"], 
{label: "Select criteria:"});
const criteriaPick = Generators.input(criteriaInput);
```


```js
// Criteria Pick input # 2
const criteriaInput2 = Inputs.select(["injury", "behavior"], 
{label: "Select criteria:"});
const criteriaPick2 = Generators.input(criteriaInput2);
```

```js
// Criteria Pick input # 3
const criteriaInput3 = Inputs.select(["injury", "behavior"], 
{label: "Select criteria:"});
const criteriaPick3 = Generators.input(criteriaInput3);
```


```js
const speciesTableInput = arrayToTable(demoExposureData, criteriaPick2, 10, {width});
const speciesTablePick = Generators.input(speciesTableInput);

```



```js
const subsetTenDb = demoExposureData.filter(d => d.attenuation === 10);
const groupedData = groupArr(subsetTenDb, "hearingGroup", "criteria", "percentAbundance")
const groupedDataTwo = groupAndSummarizeTwoKeys(subsetTenDb, "hearingGroup", "criteria", "percentAbundance")
const groupedDataThree = groupAndSummarizeThreeKeys(subsetTenDb, "hearingGroup", "criteria", "sch", "percentAbundance")
```

<!-- ```js
display(groupedDataThree)

``` -->