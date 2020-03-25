var chart_evolution_svg = `
<svg 
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    id="chart" 
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
                stroke-dasharray: 512;
                stroke-dashoffset: 512;
                animation: chart_path_animation 5s linear forwards;
            }

            @keyframes chart_path_animation {
                100% {
                    stroke-dashoffset: 0;
                }
            }
        </style>
    </defs>

    <g id="lines"></g>
    <path id="chart_path_death" class="chart_path" transform="" stroke="#ff9595" d="" />
    <path id="chart_path_confirmed" class="chart_path" transform="" stroke="orange" d="" />
    <g id="rects"></g>
</svg>
`
