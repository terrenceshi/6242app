from internetarchive import get_item, search_items
import urllib.request
import json

# OL26491056M
# OL45804W



def get_descriptions(works):
    data = []
    for work in works:
        identifier = work["identifier"]
        title = work["title"]
        url = 'https://openlibrary.org{}.json'.format(identifier)
        httpresponse = urllib.request.urlopen(url)
        # .decode('utf8')

        data_json = json.loads(httpresponse.read())
        # print(data_json["description"])
        keys = data_json.keys()
        if "description" in keys:
            description = data_json["description"]
            print("DID THIS ONE")
            data.append({"Title": title, "ID": identifier, "Description": description})

    return data



def get_list_of_works(date = False, year = 2020, language = False):
    if date:
        # search for books in given year:
        # https://openlibrary.org/search.json?time=2020
        url = 'https://openlibrary.org/search.json?time={}'.format(year)
    if language:
        # search for books in english
        # https://openlibrary.org/search.json?q=language:eng
        url = "https://openlibrary.org/search.json?q=language:eng"

    httpresponse = urllib.request.urlopen(url)
    # .decode('utf8')

    works = []

    data_json = json.loads(httpresponse.read())
    print(len(data_json["docs"]))
    for item in data_json:
        print(data_json["numFound"])
        if item == "docs":
            # print(type(data_json[item]))
            for element in data_json[item]:
                print(element["key"])
                works.append({"identifier": element["key"], "title": element["title"]})
    return get_descriptions(works)


works = get_list_of_works(language = True)
# print(type(works))
# print(works)
