# Import Libiraries
import requests
import json
import demjson

def main():
    url = "https://assets.staticimg.com/landing-web/1.12.0/p__investment-incubation-program__index.async.js"
    response = requests.get(url).text
    
    # find index of "Qe = [{"
    start_index = response.find("Qe=[{")

    # find index of "}];" after start_index
    end_index = response.find(',$e=n("nO/9")')

    # slice the response
    response = response[start_index:end_index]

    # parse the response
    response = response.replace("Qe=", "")

    response = demjson.decode(response)
    print(response)

    # laod json
    response = json.loads(response)
    

    print(response)



main()
