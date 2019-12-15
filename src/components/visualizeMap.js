function highchartPlot(){
            $.getJSON(
            'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json',
            function (data) {
                var data=[
                        [
                          1167609600000,
                          0.7537
                        ],
                        [
                          1167696000000,
                          0.7537
                        ],
                        [
                          1167782400000,
                          0.7559
                        ],
                        [
                          1167868800000,
                          0.7631
                        ],
                        [
                          1167955200000,
                          0.7644
                        ],
                        [
                          1168214400000,
                          0.769
                        ],
                        [
                          1168300800000,
                          0.7683
                        ]
                      ]
                // alert(JSON.stringify(data));

                Highcharts.chart('container', {
                    chart: {
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Annual Precipitation and Cumulative'
                    },
                    // subtitle: {
                    //     text: 'Source: WorldClimate.com'
                    // },
                    xAxis: [{
                        type: 'datetime',
                        labels: {
                          format: '{value:%Y}'
                      }
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value}mm',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        title: {
                            text: 'Measured Precipitations (mm)',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        }
                    }, { // Secondary yAxis
                        title: {
                            text: 'Period Cumulative (mm)',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} mm',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        opposite: true
                    }],
                    tooltip: {
                        shared: true
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        x: 120,
                        verticalAlign: 'top',
                        y: 100,
                        floating: true,
                        backgroundColor:
                            Highcharts.defaultOptions.legend.backgroundColor || // theme
                            'rgba(255,255,255,0.25)'
                    },
                    series: [{
                        name: 'Measured Precipitations (mm)',
                        type: 'column',
                        yAxis: 1,
                        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                        tooltip: {
                            valueSuffix: ' mm'
                        }

                    }, {
                        name: 'Period Cumulative (mm)',
                        type: 'spline',
                        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                        tooltip: {
                            valueSuffix: '°C'
                        }
                    }]
                });
            }
        );
       }