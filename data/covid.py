'''
    20200321
    Gabriel Cesar
    gabrielcesar2@gmail.com
'''

import json
import sys

from datetime import datetime

help = '''\
Uso:
$ python3 codigo_do_estado suspeitos confirmados recuperados mortes

Exemplo:
$ python3 PA 8 4 2 0
'''

try: 
    code = sys.argv[1]

    suspect = sys.argv[2]
    confirmed = sys.argv[3]
    recovered = sys.argv[4]
    death = sys.argv[5]

    total_suspect = 0
    total_confirmed = 0
    total_recovered = 0
    total_death = 0

    with open("covid.json", "r") as covid_data:
        covid_current = json.load(covid_data)

    for state in covid_current:
        if state['code'] == code:
            state['suspect'] = suspect
            state['confirmed'] = confirmed
            state['recovered'] = recovered
            state['death'] = death

        total_suspect += int(state['suspect'])
        total_confirmed += int(state['confirmed'])
        total_recovered += int(state['recovered'])
        total_death += int(state['death'])


    # update state
    with open("covid.json", "w") as covid_data:
        json.dump(covid_current, covid_data)


    # update totals
    with open("general.json", "r") as general_data:
        general_current = json.load(general_data)

    general_current['total_suspect'] = total_suspect
    general_current['total_confirmed'] = total_confirmed
    general_current['total_recovered'] = total_recovered
    general_current['total_death'] = total_death
    general_current['last_update_date'] = datetime.now().strftime('%d/%m/%Y')
    general_current['last_update_time'] = datetime.now().strftime('%H:%M')

    with open("general.json", "w") as general_data:
        json.dump(general_current, general_data)


    print( "O estado do %s foi atualizado para: Suspeitos: %s, Confirmados: %s, Recuperados: %s e Mortes: %s." % 
        (code, suspect, confirmed, recovered, death)
    )
    print( "O totais foram atualizados para: Suspeitos: %s, Confirmados: %s, Recuperados: %s e Mortes: %s." % 
        (total_suspect, total_confirmed, total_recovered, total_death)
    )

except:  
    print(help)

