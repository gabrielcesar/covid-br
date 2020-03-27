var chart_daily_evolution_svg = `
<center>
<svg 
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    id="chart_daily" 
    preserveAspectRatio="none"
    style="
        background-color: transparent;
        border: 1px solid #383934;
    " 
>
    <defs id="defs">
        <style type="text/css" id="style">
            .chart_path
            {
                fill: none; 
                stroke-linecap: round;
                stroke-width: 1; 
                stroke-dasharray: 1024;
                stroke-dashoffset: 1024;
                animation: chart_path_animation 5s linear forwards;
            }

            @keyframes chart_path_animation {
                100% {
                    stroke-dashoffset: 0;
                }
            }
        </style>
    </defs>

    <g id="daily_lines"></g>
    <path id="daily_chart_path_death" class="chart_path" transform="" stroke="#ff9595" d="" />
    <path id="daily_chart_path_confirmed" class="chart_path" transform="" stroke="orange" d="" />

    <g id="daily_rects"></g>
</svg>
</center>
`
