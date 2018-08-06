var ctx = document.getElementById('myChart').getContext('2d');
var slider = document.querySelector('.slider');
var benchmarkForm = document.querySelector('.benchmark-form');
var submit = document.querySelector('.just-submit');

noUiSlider.create(slider, {
	start: [ 0.1, 0.5, 0.9 ],
    connect: [false, true, true, false],
    step: 0.1,
	range: {
        'min': [  0 ],
		'max': [ 1 ]
    }
});

var snapValues = [];

slider.noUiSlider.on('update', function() {
    snapValues = slider.noUiSlider.get();
    document.querySelector('.min').textContent = "Min: " + snapValues[0];
    document.querySelector('.target').textContent = "Target: " + snapValues[1];
    document.querySelector('.max').textContent = "Max: " + snapValues[2];
});

var benchmarkValues = {
    'Analytical': [0.2, 0.5, 0.8],
    'Anger': [0.2, 0.5, 0.8],
    'Confidence': [0.2, 0.5, 0.8],
    'Fear': [0.2, 0.5, 0.8],
    'Joy': [0.2, 0.5, 0.8],
    'Sadness': [0.2, 0.5, 0.8],
    'Tentative': [0.2, 0.5, 0.8],
}

var setBenchmarkValues = function(event) {
    event.preventDefault();
    for (var i = 0; i < snapValues.length; i++) {
        snapValues[i] = parseFloat(snapValues[i]);
    }
    var selected = document.querySelector('.tone-select').value;
    benchmarkValues[selected] = snapValues;
}

benchmarkForm.addEventListener('submit', setBenchmarkValues);

minArray = [];
targetArray = [];
maxArray = [];

var createChart = function(event) {
    event.preventDefault();
    (function() {
        for (var property in benchmarkValues) {
            minArray.push(benchmarkValues[property][0]);
            targetArray.push(benchmarkValues[property][1]);
            maxArray.push(benchmarkValues[property][2]);
        }
    })();
    console.log(minArray);
    console.log(targetArray);
    console.log(maxArray);
    var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'Tone Score',
                    data: [0.2, 0.4, 0.5, 0.3, 0.2, 0.1, 0.5],
                    backgroundColor: 'rgb(65, 193, 244, 0.5)',
                    borderColor: 'rgb(65, 193, 244, 0.5)'
                    }, {
                    label: 'Minimum Approval Score',
                    data: minArray,
                    // Changes this dataset to become a line
                    type: 'line',
                    fill: false,
                    backgroundColor: 'rgb(244, 72, 66)',
                    borderColor: 'rgb(244, 72, 66)',
                    showLine: false
                    }, {
                    label: 'Target Approval Score',
                    data: targetArray,
                    type: 'line',
                    fill: false, 
                    backgroundColor: 'rgb(54, 216, 36)',
                    borderColor: 'rgb(54, 216, 36)',
                    showLine: false,
                    }, {
                    label: 'Maximum Approval Score',
                    data: maxArray,
                    type: 'line',
                    fill: false,
                    backgroundColor: 'rgb(244, 72, 66)',
                    borderColor: 'rgb(244, 72, 66)',
                    showLine: false,
                    }],
                labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
            },
            options: {
                beginatZero: true, 
                scales: {
                    yAxes: [{
                        id: 'y-axis-1',
                        type: 'linear', 
                        position: 'left', 
                        ticks: {
                            min: 0, 
                            max: 1.1
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }
        });
}

submit.addEventListener('submit', createChart)