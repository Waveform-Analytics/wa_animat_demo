export function groupArr(data, groupBy1, groupBy2, valueKey) {
  // Initialize an empty object to store grouped data
  const groupedData = {};

  // Loop through the data array
  data.forEach(item => {
    // Extract the values of the specified parameters to group by
    const groupValue1 = item[groupBy1];
    const groupValue2 = item[groupBy2];
    const value = item[valueKey];

    // If the group doesn't exist yet, initialize it with an empty array
    if (!groupedData[groupValue1]) {
      groupedData[groupValue1] = {};
    }

    if (!groupedData[groupValue1][groupValue2]) {
      groupedData[groupValue1][groupValue2] = [];
    }

    // Add the current item to the corresponding group
    groupedData[groupValue1][groupValue2].push(value);
  });

  // Initialize an array to store summary statistics
  const summary = [];

  // Loop through the grouped data
  for (const [hearingGroup, groupData] of Object.entries(groupedData)) {
    for (const [criteria, values] of Object.entries(groupData)) {
      // Calculate summary statistics for the extracted values
      const min = Math.min(...values);
      const max = Math.max(...values);
      const mean = values.reduce((acc, val) => acc + val, 0) / values.length;

      // Add summary statistics as separate rows to the summary array
      summary.push({ hearingGroup, criteria, stat: 'min', value: min });
      summary.push({ hearingGroup, criteria, stat: 'max', value: max });
      summary.push({ hearingGroup, criteria, stat: 'mean', value: mean });
    }
  }

  return summary;
}

  

export function groupAndSummarize(data, groupBy, valueKey) {
    // Initialize an empty object to store grouped data
    const groupedData = {};
  
    // Loop through the data array
    data.forEach(item => {
      // Extract the value of the specified parameter to group by
      const groupValue = item[groupBy];
  
      // If the group doesn't exist yet, initialize it with an empty array
      if (!groupedData[groupValue]) {
        groupedData[groupValue] = [];
      }
  
      // Add the current item to the corresponding group
      groupedData[groupValue].push(item);
    });
  
    // Initialize an array to store summary statistics
    const summary = [];
  
    // Loop through the grouped data
    for (const [group, groupItems] of Object.entries(groupedData)) {
      // Extract values for the specified valueKey
      const values = groupItems.map(item => item[valueKey]);
  
      // Calculate summary statistics for the extracted values
      const min = Math.min(...values);
      const max = Math.max(...values);
      const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
  
      // Add summary statistics to the summary array
      summary.push({ group, min, max, mean });
    }
  
    return summary;
  }
  
  export function groupAndSummarizeTwoKeys(data, groupBy1, groupBy2, valueKey) {
    // Initialize an empty object to store grouped data
    const groupedData = {};
  
    // Loop through the data array
    data.forEach(item => {
      // Extract the values of the specified parameters to group by
      const groupValue1 = item[groupBy1];
      const groupValue2 = item[groupBy2];
      const value = item[valueKey];
  
      // If the group doesn't exist yet, initialize it with an empty array
      if (!groupedData[groupValue1]) {
        groupedData[groupValue1] = {};
      }
  
      if (!groupedData[groupValue1][groupValue2]) {
        groupedData[groupValue1][groupValue2] = [];
      }
  
      // Add the current item to the corresponding group
      groupedData[groupValue1][groupValue2].push(value);
    });
  
    // Initialize an array to store summary statistics
    const summary = [];
  
    // Loop through the grouped data
    for (const [hearingGroup, groupData] of Object.entries(groupedData)) {
      for (const [criteria, values] of Object.entries(groupData)) {
        // Calculate summary statistics for the extracted values
        const min = Math.min(...values);
        const max = Math.max(...values);
        const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
  
        // Add summary statistics to the summary array
        summary.push({ hearingGroup, criteria, min, max, mean });
      }
    }
  
    return summary;
  }
  

export function groupAndSummarizeThreeKeys(data, groupBy1, groupBy2, groupBy3, valueKey) {
    // Initialize an empty object to store grouped data
    const groupedData = {};
  
    // Loop through the data array
    data.forEach(item => {
      // Extract the values of the specified parameters to group by
      const groupValue1 = item[groupBy1];
      const groupValue2 = item[groupBy2];
      const groupValue3 = item[groupBy3];
      const value = item[valueKey];
  
      // If the group doesn't exist yet, initialize it with an empty array
      if (!groupedData[groupValue1]) {
        groupedData[groupValue1] = {};
      }
  
      if (!groupedData[groupValue1][groupValue2]) {
        groupedData[groupValue1][groupValue2] = [];
      }

      if (!groupedData[groupValue1][groupValue2][groupValue3]) {
        groupedData[groupValue1][groupValue2][groupValue3] = [];
      }
  
      // Add the current item to the corresponding group
      groupedData[groupValue1][groupValue2][groupValue3].push(value);
    });
  
    // Initialize an array to store summary statistics
    const summary = [];
  
    // Loop through the grouped data
    for (const [hearingGroup, group1Data] of Object.entries(groupedData)) {
        for (const [criteria, group2Data] of Object.entries(group1Data)) {
          for (const [sch, values] of Object.entries(group2Data)) {
            // Calculate summary statistics for the extracted values
            const min = Math.min(...values);
            const max = Math.max(...values);
            const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    
            // Add summary statistics to the summary array
            summary.push({ hearingGroup, criteria, sch, min, max, mean });
          }
        }
      }
  
    return summary;
  }
  