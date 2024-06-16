import React from 'react';
import Chart from 'react-apexcharts';

const ChartComponent = () => {
  const options = {
    series: [{
      data: [10, 200, 500, 100, 60, 180, 500]
    }],
    annotations: {
      points: [{
        x: 'Bananas',
        seriesIndex: 0,
        label: {
          borderColor: '#00753E',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#00753E',
          },
        }
      }]
    },
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '30%',
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
        width: 2,
        colors: ['#00753E']
      },
    grid: {
      show: false,
    },
    xaxis: {
      show: false,
      axisBorder: {
        show: false
      },
      labels: {
        rotate: -45
      },
      categories: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
      tickPlacement: 'on'
    },
    yaxis: {
        min: 0,
        max: 500,
        tickAmount: 5,
        labels: {
          formatter: function (value) {
            if (value === 0 || value === 10 || value === 50 || value === 100 || value === 200 || value === 500) {
              return value.toString();
            } else {
              return value;
            }
          }
        }
      },
      fill: {
        colors: ['#00753E'],
      }
  };

  return (
    <div className="rounded-[10px] bg-[#FFF] flex flex-col gap-5 px-[1.5rem] pt-5 w-full">
        <div className="flex justify-between items-center border-b-[1px] border-b-[#110D06] border-opacity-[5%] pb-4">
            <h1 className="text-[#110D06] font-semibold macScreens:text-lg lg:text-sm">Site Visits</h1>
            <div class="relative">
                <select className="bg-[#fff] text-[#110D06] outline-none border-[1px] border-[#110D06] py-2 px-4 cursor-pointer rounded-[10px] relative">
                    <option className="font-Nunito font-light" value="1">This Month</option>
                    <option className="font-Nunito font-light" value="2">January</option>
                    <option className="font-Nunito font-light" value="3">February</option>
                    <option className="font-Nunito font-light" value="4">March</option>
                    <option className="font-Nunito font-light" value="5">April</option>
                    <option className="font-Nunito font-light" value="6">May</option>
                    <option className="font-Nunito font-light" value="7">June</option>
                    <option className="font-Nunito font-light" value="8">July</option>
                    <option className="font-Nunito font-light" value="9">August</option>
                    <option className="font-Nunito font-light" value="10">September</option>
                    <option className="font-Nunito font-light" value="11">November</option>
                    <option className="font-Nunito font-light" value="12">December</option>
                </select>
            </div>
        </div>
        <Chart options={options} series={options.series} type="bar" height={350} />

    </div>
  );
};

export default ChartComponent;