// from data.js, data is array of objects
// YOUR CODE HERE!
function buildTable(filtering = false) {
    const defaultTable = `<thead>
    <tr>
      <th class="table-head">Date</th>
      <th class="table-head">City</th>
      <th class="table-head">State</th>
      <th class="table-head">Country</th>
      <th class="table-head">Shape</th>
      <th class="table-head">Duration</th>
      <th class="table-head">Comments</th>
    </tr>
  </thead>`;
    //set the table to its header rows
    const tableElem = d3.select('#et-table');
    tableElem.html(defaultTable);

    //if we're not filtering, show all the data
    if (!filtering) {
        const dateSet = new Set();
        const citySet = new Set();
        const stateSet = new Set();
        const countrySet = new Set();
        const shapeSet = new Set();

        console.log('case1')
        for (let i = 0; i < data.length; i++) {
            const newRow = tableElem.append('tr');
            Object.values(data[i]).forEach(cell => newRow.append('td').text(cell));
            //building the drop-down sets
            dateSet.add(data[i]['datetime']);
            citySet.add(data[i]['city']);
            stateSet.add(data[i]['state']);
            countrySet.add(data[i]['country']);
            shapeSet.add(data[i]['shape']);

        }
        //actually adding the dropdown options
        Array.from(dateSet).forEach(item => d3.select("#selDate").append("option").text(item));
        Array.from(citySet).sort().forEach(item => d3.select("#selCity").append("option").text(item));
        Array.from(stateSet).sort().forEach(item => d3.select("#selState").append("option").text(item));
        Array.from(countrySet).sort().forEach(item => d3.select("#selCountry").append("option").text(item));
        Array.from(shapeSet).sort().forEach(item => d3.select("#selShape").append("option").text(item));

    }
    else {
        filterMethod()
    }
    //if our table is blank, show "NO RESULTS"
    if (tableElem.html() == defaultTable) {
        tableElem.html("<tr><td>NO RESULTS</td></tr>")
    }
};


function filterMethod() {
    //grab all the filters from the dropdown
    const dateFilter = d3.select("#selDate").property("value");
    const cityFilter = d3.select("#selCity").property("value");
    const stateFilter = d3.select("#selState").property("value");
    const countryFilter = d3.select("#selCountry").property("value");
    const shapeFilter = d3.select("#selShape").property("value");

    //filter by date
    const dateIndices = new Set();
    const cityIndices = new Set();
    const stateIndices = new Set();
    const countryIndices = new Set();
    const shapeIndices = new Set();

    //if no filter, they all match
    if (dateFilter === "none") {
        for (let i = 0; i < data.length; i++) {
            dateIndices.add(i);
        }
    }
    else {
        for (let i = data.length - 1; i >= 0; i--) {
            Object.keys(data[i]).forEach(key => {
                if (key == 'datetime' && data[i][key] == dateFilter) {
                    dateIndices.add(i)
                }
            })
        }
    }
    //filter by city
    if (cityFilter === "none") {
        for (let i = 0; i < data.length; i++) {
            cityIndices.add(i);
        }
    }
    else {
        for (let i = 0; i < data.length; i++) {
            Object.keys(data[i]).forEach(key => {
                if (key == 'city' && data[i][key] == cityFilter) {
                    cityIndices.add(i)
                }
            })
        }
    }
    //filter by state
    if (stateFilter === "none") {
        for (let i = 0; i < data.length; i++) {
            stateIndices.add(i);
        }
    }
    else {
        for (let i = 0; i < data.length; i++) {
            Object.keys(data[i]).forEach(key => {
                if (key == 'state' && data[i][key] == stateFilter) {
                    stateIndices.add(i)
                }
            })
        }
    }
    //filter by country
    if (countryFilter === "none") {
        for (let i = 0; i < data.length; i++) {
            countryIndices.add(i);
        }
    }
    else {
        for (let i = 0; i < data.length; i++) {
            Object.keys(data[i]).forEach(key => {
                if (key == 'country' && data[i][key] == countryFilter) {
                    countryIndices.add(i)
                }
            })
        }
    }
    //filter by shape
    if (shapeFilter === "none") {
        for (let i = 0; i < data.length; i++) {
            shapeIndices.add(i);
        }
    }
    else {
        for (let i = 0; i < data.length; i++) {
            Object.keys(data[i]).forEach(key => {
                if (key == 'shape' && data[i][key] == shapeFilter) {
                    shapeIndices.add(i)
                }
            })
        }
    }

    //finding the intersection of the sets
    //I found this on stackoverflow trying to find a js-native implementation, which apparently doesn't exist
    const indices = [Array.from(dateIndices), Array.from(cityIndices), Array.from(stateIndices), Array.from(countryIndices), Array.from(shapeIndices)];
    console.log(indices);
    const matchingIndices = indices.reduce((a,b) => a.filter(c => b.includes(c)));
    
    //build the filtered table
    matchingIndices.sort((a, b) => { a - b });
    console.log(matchingIndices);
    const tableElem = d3.select('#et-table');
    for (let i = 0; i < matchingIndices.length; i++) {
        const newRow = tableElem.append('tr');
        Object.values(data[matchingIndices[i]]).forEach(cell => newRow.append('td').text(cell));
    }
};

const filterElem = d3.select('#filter-btn');
filterElem.on('click', () => {
    buildTable(filtering = true);
});

buildTable();
