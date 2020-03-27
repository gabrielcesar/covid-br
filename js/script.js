/*
* 20200321
* Gabriel Cesar
* gabrielcesar2@gmail.com
*/

var colors = [
    '#ff998f', '#ffa184', '#ffa979', '#ffb06e', '#ffb863', 
    '#ffc058', '#ffc84d', '#ffd042', '#ffd837', '#ffe02c', 
    '#ffe721', '#ffef16', '#fff70b', '#ffff00', '#fafd0a', 
    '#f6fb14', '#f1f91e', '#ecf728', '#e7f532', '#e3f33c', 
    '#def147', '#d9ef51', '#d4ed5b', '#d0eb65', '#cbe96f', 
    '#c6e779', '#c1e583'
]

tooltip = (event, label) => {
    document.getElementById('arwen_tooltip').innerHTML = label
    document.getElementById('arwen_tooltip').style.display = 'block'
    document.getElementById('arwen_tooltip').style.top = event.clientY - 45 + 'px'
    document.getElementById('arwen_tooltip').style.left = event.clientX + 16 + 'px'
}

tooltip_close = () => { document.getElementById('arwen_tooltip').style.display = 'none' }

chart_evolution_label = (date, confirmed, death) => {
    document.getElementById('arwen_chart_evolution_label').innerHTML = date + ' &bull; Confirmados: <span class=\'arwen_color_orange arwen_font_size_10\'>' + confirmed + '</span> &bull; Mortes: <span class=\'arwen_color_red arwen_font_size_10\'>' + death + '</span>'
}

chart_daily_evolution_label = (date, confirmed, death) => {
    document.getElementById('arwen_chart_daily_evolution_label').innerHTML = date + ' &bull; Confirmados: <span class=\'arwen_color_orange arwen_font_size_10\'>' + confirmed + '</span> &bull; Mortes: <span class=\'arwen_color_red arwen_font_size_10\'>' + death + '</span>'
}

fetch("https://gabrielcesar.github.io/covid-br/data/covid.json")
.then(response => response.json())
.then((data) => {
    data.sort((a, b) => parseInt(a.confirmed) < parseInt(b.confirmed) ? 1 : -1);
    document.getElementById('arwen_main').innerHTML = stateBorders
    
    for (let stateIndex in data) 
    {
        let state = data[stateIndex];

        document.getElementById(state['state']).addEventListener("mousemove", () => {
            tooltip(event, '<div class=\'arwen_icon_tooltip arwen_flag_' + state['code'] + '\'></div><span id=\'arwen_tooltip_label\'>' + state['state'] + "</span><br>Confirmados <span class='arwen_color_orange'>" + state['confirmed'] + "</span><br>Mortes <span class='arwen_color_red'>" + state['death'] + "</span>")
            document.getElementById('arwen_tooltip_label').style.color = colors[stateIndex]
        })
        
        document.getElementById(state['state']).addEventListener("mouseout", () => { tooltip_close() })
        document.getElementById('arwen_menu').innerHTML += '<div class=\'arwen_item\'><div class=\'arwen_icon arwen_flag_' + state['code'] + '\'></div>' + state['state'] + '<div class=\'arwen_amount arwen_death\'>' + state['death'] + '</div><div class=\'arwen_amount arwen_confirmed\'>' + state['confirmed'] + '</div></div>'
        document.getElementById(state['state']).style.fill = colors[stateIndex]
    }
    
    document.getElementById('arwen_min').innerHTML = data[data.length - 1]['confirmed']
    document.getElementById('arwen_max').innerHTML = data[0]['confirmed']
})

// general
fetch("https://raw.githubusercontent.com/gabrielcesar/covid-br/master/data/general.json")
.then(response => response.json())
.then((data) => {
    //document.getElementById('total_suspect').innerHTML = data['total_suspect']
    document.getElementById('total_confirmed').innerHTML = data['total_confirmed']
    //document.getElementById('total_recovered').innerHTML = data['total_recovered']
    document.getElementById('total_death').innerHTML = data['total_death']
    document.getElementById('box_total_confirmed').innerHTML = data['total_confirmed']
    document.getElementById('box_total_death').innerHTML = data['total_death']
    document.getElementById('last_update_date').innerHTML = data['last_update_date']
    document.getElementById('last_update_time').innerHTML = data['last_update_time']
})

// chart_evolution
fetch("https://raw.githubusercontent.com/gabrielcesar/covid-br/master/data/evolution.json")
.then(response => response.json())
.then((data) => {
    document.getElementById('arwen_chart_evolution').innerHTML = chart_evolution_svg 

    let chart_width = 238
    let chart_height = 140
    let path_d_confirmed = 'M 0 0 ' 
    let path_d_death = 'M 0 0 ' 
    let chart = document.getElementById('chart')

    chart.style.width = chart_width 
    chart.style.height = chart_height

    for (let day in data) 
    {
        let path_d_confirmed_x = (parseInt(day) + 1) * (chart_width / data.length)
        let path_d_confirmed_y = data[day]['confirmed_accumulated'] * (chart_height / data[data.length - 1]['confirmed_accumulated'])
        path_d_confirmed += path_d_confirmed_x + ' ' + path_d_confirmed_y + ' '

        let path_d_death_x = (parseInt(day) + 1) * (chart_width / data.length)
        let path_d_death_y = data[day]['death_accumulated'] * (chart_height / data[data.length - 1]['confirmed_accumulated'])
        path_d_death += path_d_death_x + ' ' + path_d_death_y + ' '

        let line_x = '<path style="fill: none; stroke-width: 1;" stroke="#2b2c26" d="M ' + path_d_confirmed_x + ' 0 ' + path_d_confirmed_x + ' ' + chart_height + '" />'
        document.getElementById('lines').innerHTML += line_x

        let line_y = '<path style="fill: none; stroke-width: 1;" stroke="#2b2c26" d="M 0 ' + (chart_height / data.length) * day + ' ' + chart_width + ' ' + (chart_height / data.length) * day + '"/>'
        document.getElementById('lines').innerHTML += line_y

        let rect = '<rect style="width: ' + (chart_width / data.length) + 'px; height: 100%; fill: #00ffff; x: ' + parseInt(day) * (chart_width / data.length) + 'px; y: 0px; opacity: 0;" onmouseover="this.style.opacity = 0.3; chart_evolution_label(\'' + data[day]['date'] + '\', ' + data[day]['confirmed_accumulated'] + ', ' + data[day]['death_accumulated'] + ')" onmouseout="this.style.opacity = 0"/>'
        document.getElementById('rects').innerHTML += rect
    }

    document.getElementById('chart_path_confirmed').setAttribute("transform", 'scale(1, -1) translate(0, -' + chart_height + ')')
    document.getElementById('chart_path_confirmed').setAttribute('d', path_d_confirmed)
    document.getElementById('chart_path_death').setAttribute("transform", 'scale(1, -1) translate(0, -' + chart_height + ')')
    document.getElementById('chart_path_death').setAttribute('d', path_d_death)
})

// chart_daily_evolution
fetch("https://raw.githubusercontent.com/gabrielcesar/covid-br/master/data/evolution.json")
.then(response => response.json())
.then((data) => {
    document.getElementById('arwen_chart_daily_evolution').innerHTML = chart_daily_evolution_svg 

    let chart_width = 238
    let chart_height = 140
    let path_d_confirmed = 'M 0 0 ' 
    let path_d_death = 'M 0 0 ' 
    let chart = document.getElementById('chart_daily')

    chart.style.width = chart_width 
    chart.style.height = chart_height

    for (let day in data) 
    {
        let path_d_confirmed_x = (parseInt(day) + 1) * (chart_width / data.length)
        let path_d_confirmed_y = data[day]['confirmed_daily'] * (chart_height / data[data.length - 1]['confirmed_daily'])
        path_d_confirmed += path_d_confirmed_x + ' ' + path_d_confirmed_y + ' '

        let path_d_death_x = (parseInt(day) + 1) * (chart_width / data.length)
        let path_d_death_y = data[day]['death_daily'] * (chart_height / data[data.length - 1]['confirmed_daily'])
        path_d_death += path_d_death_x + ' ' + path_d_death_y + ' '

        let line_x = '<path style="fill: none; stroke-width: 1;" stroke="#2b2c26" d="M ' + path_d_confirmed_x + ' 0 ' + path_d_confirmed_x + ' ' + chart_height + '" />'
        document.getElementById('daily_lines').innerHTML += line_x

        let line_y = '<path style="fill: none; stroke-width: 1;" stroke="#2b2c26" d="M 0 ' + (chart_height / data.length) * day + ' ' + chart_width + ' ' + (chart_height / data.length) * day + '"/>'
        document.getElementById('daily_lines').innerHTML += line_y

        let rect = '<rect style="width: ' + (chart_width / data.length) + 'px; height: 100%; fill: #00ffff; x: ' + parseInt(day) * (chart_width / data.length) + 'px; y: 0px; opacity: 0;" onmouseover="this.style.opacity = 0.3; chart_daily_evolution_label(\'' + data[day]['date'] + '\', ' + data[day]['confirmed_daily'] + ', ' + data[day]['death_daily'] + ')" onmouseout="this.style.opacity = 0;"/>'
        document.getElementById('daily_rects').innerHTML += rect
    }

    document.getElementById('daily_chart_path_confirmed').setAttribute("transform", 'scale(1, -1) translate(0, -' + chart_height + ')')
    document.getElementById('daily_chart_path_confirmed').setAttribute('d', path_d_confirmed)
    document.getElementById('daily_chart_path_death').setAttribute("transform", 'scale(1, -1) translate(0, -' + chart_height + ')')
    document.getElementById('daily_chart_path_death').setAttribute('d', path_d_death)
})



