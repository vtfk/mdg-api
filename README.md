# Metadatagenerator API

## Metadata templates
The different type templates is stored [here](https://github.com/vtfk/mdg-api/tree/master/lib/data) and uses es6-templating to specify variables.

  - [overforingsbrev](https://github.com/vtfk/mdg-api/blob/master/lib/data/overforingsbrev.json)
  - ...


## API endpoints

### GET /api/document
Returns list of all document types available

#### Example
```
$ curl http://localhost:3000/api/document
```

Output:
```json
[
  {
    "name": "overforingsbrev",
    "fields": [
      "employee.name",
      "employee.id"
      "manager.name",
    ],
    "template": {
      ...
    }
  }
]
```


### POST /api/document/***:type***

#### Example
```
$ curl -H "Accept: application/json" http://localhost:3000/api/document/overforingsbrev --data '{ "manager": { "name": "Ola Nordmann" }, "employee": { "id": "26118600000", "name": "Kari Nordmann" } }'
```

Output:
```json
{
  "Title": "Overføringsbrev",
  "UnofficialTitle": "Overføringsbrev - Kari Nordmann",
  "AccessCode": 13,
  "Paragraph": "Offl §13 jfr Fvl §13.1",
  "AccessGroup": "Alle",
  "Status": "J",
  "Category": "Dokument ut",
  "NoarkClassificationCode": "B31",
  "ResponsiblePersonEmail": "Ola Nordmann",
  "Contacts": [
    {
      "ReferenceNumber": "821227062",
      "Role": "Avsender"
    },
    {
      "ReferenceNumber": "26118600000",
      "Role": "Mottaker"
    }
  ]
}
```

## Development server
```
git clone https://github.com/vtfk/mdg-api.git
npm install
npm run dev 
```
