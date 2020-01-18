// from data.js, data is array of objects
// YOUR CODE HERE!
function buildTable(filterValue = '') {
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

    const tableElem = d3.select('#et-table');
    tableElem.html(defaultTable);
    console.log(filterValue);
    if (!filterValue) {
        console.log('case1')
        for (let i = 0; i < data.length; i++) {
            const newRow = tableElem.append('tr');
            Object.values(data[i]).forEach(cell => newRow.append('td').text(cell));
        }
    }
    else {
        console.log('case2')
        for (let i = 0; i < data.length; i++) {
            Object.keys(data[i]).forEach(key => {
                if (key == 'datetime' && data[i][key] == filterValue) {
                    const newRow = tableElem.append('tr');
                    Object.values(data[i]).forEach(cell => newRow.append('td').text(cell));
                }
            })
        }
        if (tableElem.html() == defaultTable) {
            tableElem.html("<tr><td>NO RESULTS</td></tr>")
        }
    }
};


const filterElem = d3.select('#filter-btn');
filterElem.on('click', () => {
    filterValue = d3.select('#datetime').property('value');
    console.log('hi');
    buildTable(filterValue);
});

buildTable();