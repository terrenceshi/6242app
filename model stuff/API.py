from internetarchive import get_item, search_items
import urllib.request
import json
import pandas as pd
from langdetect import detect, detect_langs
import re

# OL26491056M
# OL45804W


def language_detection(text, method = "single"):
    try:
        if(method.lower() != "single"):
            result = detect_langs(text)

        else:
            result = detect(text)
    except:
        print("exception occurred")
        print(text)
        return -1;
    return result


def get_descriptions(works):
    data = []
    for work in works:
        identifier = work["identifier"]
        title = work["title"]
        url = 'https://openlibrary.org{}.json'.format(identifier)
        httpresponse = urllib.request.urlopen(url)
        data_json = json.loads(httpresponse.read())
        # print(data_json["description"])
        keys = data_json.keys()
        if "description" in keys:
            # print(title)
            # print(identifier)
            if type(data_json["description"]) == dict:
                description = data_json["description"]["value"]
            else:
                descriptions = data_json["description"]
            print(description)
            print(type(description))
            print("\n\n\n\n")
            if bool(re.match('^(?=.*[a-zA-Z])', description)):
                lang = (language_detection(description))
                if lang == "en":
                    # print(description)
                    # print("\n\n\n\n")
                    data.append({"Title": title, "ID": identifier, "Description": description})
    df = pd.DataFrame(data)
    return df



def get_list_of_works(date = False, year = 2020, language = False):
    if date:
        # search for books in given year:
        # https://openlibrary.org/search.json?time=2020
        url = 'https://openlibrary.org/search.json?time={}'.format(year)
    if language:
        # search for books in english
        # https://openlibrary.org/search.json?q=language:eng
        url = "https://openlibrary.org/search.json?q=language:eng&limit=10000"

    httpresponse = urllib.request.urlopen(url)
    works = []

    data_json = json.loads(httpresponse.read())
    # print(len(data_json["docs"]))
    for element in data_json["docs"]:
        if "language" in element:
            # print(element["language"])
            works.append({"identifier": element["key"], "title": element["title"]})
    return get_descriptions(works)


data = get_list_of_works(language = True)
data.to_csv('book_data_eng.csv')
print("ROWS: ", data.shape[0])
# print(len(data))
# print(data)
