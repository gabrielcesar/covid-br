/*
* 20200321
* Gabriel Cesar
* gabrielcesar2@gmail.com
*/

var colors = [
    '#c1e583', '#c6e779', '#cbe96f', '#d0eb65', '#d4ed5b',
    '#d9ef51', '#def147', '#e3f33c', '#e7f532', '#ecf728',
    '#f1f91e', '#f6fb14', '#fafd0a', '#ffff00', '#fff70b',
    '#ffef16', '#ffe721', '#ffe02c', '#ffd837', '#ffd042',
    '#ffc84d', '#ffc058', '#ffb863', '#ffb06e', '#ffa979',
    '#ffa184', '#ff998f'
];

function tooltip(event, label) {
    document.getElementById('arwen_tooltip').innerHTML = label
    document.getElementById('arwen_tooltip').style.display = 'block'
    document.getElementById('arwen_tooltip').style.top = event.clientY - 45 + 'px'
    document.getElementById('arwen_tooltip').style.left = event.clientX + 16 + 'px'
}

function tooltip_close() {
    document.getElementById('arwen_tooltip').style.display = 'none'
}

// state, code, suspect, confirmed, recovered, death
var states = []
var states_color = []

//fetch("https://raw.githubusercontent.com/gabrielcesar/covid-br/master/data/covid.json")
fetch("https://gabrielcesar.github.io/covid-br/data/covid.json")
.then(response => response.json())
.then(function (data) {
    for (var state = 0; state < data.length; state++) {
        states.push({
            'name': data[state]['state'],
            'code': data[state]['code'],
            'suspect': data[state]['suspect'],
            'confirmed': data[state]['confirmed'],
            'recovered': data[state]['recovered'],
            'death': data[state]['death']
        })
    }

    states.sort((a, b) => parseInt(a.confirmed) < parseInt(b.confirmed) ? 1 : -1);
    
    document.getElementById('arwen_main').innerHTML = stateBorders
    
    for (let stateIndex in states) {// = 0; state < states.length; state++) {
        let state = states[stateIndex];
        document.getElementById(state['name']).addEventListener("mousemove", function () {
            tooltip(event, '<div class=\'arwen_icon_tooltip arwen_flag_' + state['code'] + '\'></div><span id=\'arwen_tooltip_label\'>' + state['name'] + "</span><br>Confirmados <span class='arwen_color_orange'>" + state['confirmed'] + "</span><br>Mortes <span class='arwen_color_red'>" + state['death'] + "</span>")
            document.getElementById('arwen_tooltip_label').style.color = colors[state]
        })
        
        document.getElementById(state['name']).addEventListener("mouseout", function () {
            tooltip_close()
        })
        document.getElementById('arwen_menu').innerHTML += '<div class=\'arwen_item\'><div class=\'arwen_icon arwen_flag_' + state['code'] + '\'></div>' + state['name'] + '<div class=\'arwen_amount arwen_death\'>' + state['death'] + '</div><div class=\'arwen_amount arwen_confirmed\'>' + state['confirmed'] + '</div></div>'
        document.getElementById('arwen_menu_right').innerHTML += '<div class=\'arwen_item\'><div class=\'arwen_icon arwen_flag_' + state['code'] + '\'></div>' + state['name'] + '<div class=\'arwen_amount\'>' + state['death'] + '</div></div>'
        states_color.push({
            name: state['name'],
            confirmed: parseInt(state['confirmed'])
        })
    }
    
    states_color.sort(function (a, b) {
        return a.confirmed - b.confirmed
    })
    
    for (let state_color = 0; state_color < states_color.length; state_color++) {
        document.getElementById(states_color[state_color]['name']).style.fill = colors[state_color]
        //document.getElementById('arwen_tooltip_label').style.color = colors[state_color] 
        //document.getElementById('arwen_bar').innerHTML += '<div class="arwen_bar_segment" style="background-color: ' + colors[state_color] + ';"></div>'
        
        /*
        document.getElementById(states_color[state_color]['state']).addEventListener("mousemove", function(){ 
            tooltip(event, '<div class=\'arwen_icon_tooltip arwen_flag_' + states_color[state_color]['state'] + '\'></div><span id=\'arwen_tooltip_label\'>' + states_color[state_color]['state'] + "</span><br>Confirmados <span class='arwen_color_orange'>0</span><br>Mortes <span class='arwen_color_red'>" + 0 + "</span>")
            document.getElementById('arwen_tooltip_label').style.color = colors[state_color] 
        })
        */
    }
    
    document.getElementById('arwen_min').innerHTML = states_color[0]['confirmed']
    document.getElementById('arwen_max').innerHTML = states_color[states_color.length - 1]['confirmed']
    
})

// general
fetch("https://raw.githubusercontent.com/gabrielcesar/covid-br/master/data/general.json")
.then(response => response.json())
.then(function (data) {
    //document.getElementById('total_suspect').innerHTML = data['total_suspect']
    document.getElementById('total_confirmed').innerHTML = data['total_confirmed']
    //document.getElementById('total_recovered').innerHTML = data['total_recovered']
    document.getElementById('total_death').innerHTML = data['total_death']
    document.getElementById('box_total_confirmed').innerHTML = data['total_confirmed']
    document.getElementById('box_total_death').innerHTML = data['total_death']
    document.getElementById('last_update_date').innerHTML = data['last_update_date']
    document.getElementById('last_update_time').innerHTML = data['last_update_time']
})