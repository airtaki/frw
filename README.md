# Simple product API
### A test task for F+R

This is a simple REST API to handle products and producers.

## Getting Started

At first, clone the repository:

```bash
git clone git@github.com:airtaki/frw.git
cd frw
```

Then, rename or copy the `.env.sample` file to `.env`:

```bash
mv src/.env.sample src/.env
```

Open your favourite editor and edit the `.env` file. You can change the port, the debug mode, the environment etc. as you want, but the default values should work, except one entry. You have to modify the `MONGODB_URI`, based on your own Mongo DB settings:

```ini
MONGODB_URI = 'mongodb://username:password@127.0.0.1:27017/dbname'
```

Now close the editor, go back to the `frw` folder and install the packages:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Now you can run it with `node`:

```bash
node dist/index.js
```

Or, if you want, can be launch in developer mode too, using `nodemon` package. Just simply type in:

```bash
npm start
```

Both cases, you should get the following message: `Test task is listening on port 3000.` (If you set the `APP_NAME` and/or the `APP_PORT`, you'll see your entries instead of `Test task` and `3000`.)

Now the API is ready to handle the requests.

## Endpoints

### Producers
-------------
#### Get a single producer by ID
<details>
  <summary>
    <code>GET</code>
    <code>/producer/{id}</code>
  </summary>

##### Parameters

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `id`       |  required | string         | the producer's ObjectId             |

##### Responses

> | http code     | content-type                      | response                  |
> |---------------|-----------------------------------|---------------------------|
> | `200`         | `application/json`                | the producer object       |
> | `404`         | `application/json`                | producer not found        |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" http://localhost:3000/producer/655a3f745bb339041f09a4b8
> ```
</details>

#### Create a new producer
<details>
  <summary>
    <code>POST</code>
    <code>/producer</code>
  </summary>

##### Parameters

> none

##### POST data (JSON)

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `name`     |  required | string         | the name of the producer            |
> | `country`  |  optional | string         | the country of the producer         |
> | `region`   |  optional | string         | the region of the producer          |

##### Responses

> | http code     | content-type                      | response                  |
> |---------------|-----------------------------------|---------------------------|
> | `201`         | `application/json`                | the producer object       |

##### Example cURL

> ```bash
> curl -X POST -H "Content-Type: application/json" http://localhost:3000/producer
> {
>     "name": "Foo Bar",
>     "country": "France",
>     "region": "Bordeaux"
> }
> ```
</details>

#### Update an existing producer
<details>
  <summary>
    <code>PUT</code>
    <code>/producer</code>
  </summary>

##### Parameters

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `id`       |  required | string         | the producer's ObjectId             |

##### POST data (JSON)

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `name`     |  optional | string         | the name of the producer            |
> | `country`  |  optional | string         | the country of the producer         |
> | `region`   |  optional | string         | the region of the producer          |

##### Responses

> | http code     | content-type                      | response                    |
> |---------------|-----------------------------------|-----------------------------|
> | `200`         | `application/json`                | the updated producer object |

##### Example cURL

> ```bash
> curl -X PUT -H "Content-Type: application/json" http://localhost:3000/producer
> {
>     "name": "Foo Bar",
>     "country": "France",
>     "region": "Bordeaux"
> }
> ```
</details>

#### Delete an existing producer
<details>
  <summary>
    <code>DELETE</code>
    <code>/producer</code>
  </summary>

##### Parameters

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `id`       |  required | string         | the producer's ObjectId             |

##### Responses

> | http code     | content-type                      | response                  |
> |---------------|-----------------------------------|---------------------------|
> | `200`         | `application/json`                | deleted count             |

##### Example cURL

> ```bash
>  curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/producer
> ```
</details>

### Products
-------------
#### Get a single product by ID
<details>
  <summary>
    <code>GET</code>
    <code>/product/{id}</code>
  </summary>

##### Parameters

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `id`       |  required | string         | the ObjectId of the product         |

##### Responses

> | http code     | content-type                      | response                  |
> |---------------|-----------------------------------|---------------------------|
> | `200`         | `application/json`                | the product object        |
> | `404`         | `application/json`                | product not found         |

##### Example cURL

> ```bash
>  curl -X GET -H "Content-Type: application/json" http://localhost:3000/product/655a3f745bb339041f09a4cd
> ```
</details>

#### Get a products by producer ID
<details>
  <summary>
    <code>GET</code>
    <code>/product/producer/{id}</code>
  </summary>

##### Parameters

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `id`       |  required | string         | the ObjectId of the producer        |

##### Responses

> | http code     | content-type                      | response                                      |
> |---------------|-----------------------------------|-----------------------------------------------|
> | `200`         | `application/json`                | list of products                              |
> | `404`         | `application/json`                | products not found with the given producer id |

##### Example cURL

> ```bash
> curl -X GET -H "Content-Type: application/json" http://localhost:3000/product/producer/655a3f745bb339041f09a4b8
> ```
</details>

#### Create a new product
<details>
  <summary>
    <code>POST</code>
    <code>/product</code>
  </summary>

##### Parameters

> none

##### POST data (JSON)

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `name`     |  required | string         | the name of the product             |
> | `vintage`  |  required | number         | the vintage of the product          |
> | `producer` |  required | string         | the producer id of the producer     |

> Instead of a single product, you can set an array of products too. In this case all the given products will be processed.

##### Responses

> | http code     | content-type                      | response                       |
> |---------------|-----------------------------------|--------------------------------|
> | `201`         | `application/json`                | list of the created product(s) |

##### Example cURL

> ```bash
> curl -X POST -H "Content-Type: application/json" http://localhost:3000/product
> {
>     "name": "Foo Bar",
>     "vintage": "2021",
>     "producer": "655a3f745bb339041f09a4b8"
> }
>
> or
>
> curl -X POST -H "Content-Type: application/json" http://localhost:3000/product
> [{
>     "name": "Foo Bar",
>     "vintage": "2021",
>     "producer": "655a3f745bb339041f09a4b8"
> },
> {
>     "name": "Baz bar bar",
>     "vintage": "2022",
>     "producer": "655a3f745bb339041f09a53e"
> }]
> ```
</details>

#### Create a new product by a remote CSV
<details>
  <summary>
    <code>POST</code>
    <code>/product/csv</code>
  </summary>

Keep in mind, when you call this method, it responses immediately  a `started: true` message with status code `202 Accepted`.
In the background, it forks a new instance, and starts to process the given CSV url. It takes 5 to 10 seconds to see the
output on the console.

##### Query string

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `url`      |  required | string         | A link to a valid remote CSV file   |

##### POST data (JSON)

> none

##### Responses

> | http code     | content-type                      | response                       |
> |---------------|-----------------------------------|--------------------------------|
> | `202`         | `application/json`                | started: true                  |

##### Example cURL

> ```bash
> curl -X POST -H "Content-Type: application/json" http://localhost:3000/product/csv/?url=https://foobar.baz/path/to/a/valid.csv
> ```
</details>

#### Update an existing product
<details>
  <summary>
    <code>PUT</code>
    <code>/product</code>
  </summary>

##### Parameters

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `id`       |  required | string         | the ObjectId of the product         |

##### POST data (JSON)

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `name`     |  optional | string         | the name of the product             |
> | `vintage`  |  optional | number         | the vintage of the product          |
> | `producer` |  optional | string         | the producer id of the producer     |

##### Responses

> | http code     | content-type                      | response                   |
> |---------------|-----------------------------------|----------------------------|
> | `200`         | `application/json`                | the updated product object |

##### Example cURL

> ```bash
> curl -X PUT -H "Content-Type: application/json" http://localhost:3000/product
> {
>     "name": "Foo Bar",
>     "vintage": "2021",
>     "producer": "655a3f745bb339041f09a4b8"
> }
> ```
</details>

#### Delete an existing product
<details>
  <summary>
    <code>DELETE</code>
    <code>/product</code>
  </summary>

##### Parameters

> | name       |  type     | data type      | description                         |
> |------------|-----------|----------------|-------------------------------------|
> | `id`       |  required | string         | the ObjectId of the product         |

##### Responses

> | http code     | content-type                      | response                  |
> |---------------|-----------------------------------|---------------------------|
> | `200`         | `application/json`                | deleted count             |

##### Example cURL

> ```bash
> curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/product
> ```
</details>

#### Bulk delete products
<details>
  <summary>
    <code>DELETE</code>
    <code>/product</code>
  </summary>

##### Parameters

> none

##### POST data (JSON)

> | name       |  type     | data type      | description                                                   |
> |------------|-----------|----------------|---------------------------------------------------------------|
> | `ids`      |  required | array          | an array, containing the Object ids of the deletable products |

##### Responses

> | http code     | content-type                      | response                  |
> |---------------|-----------------------------------|---------------------------|
> | `200`         | `application/json`                | deleted count             |

##### Example cURL

> ```bash
> curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/product
> {
>   ids: ["655b3a8b5bb339041f0e4bf0", "655b3a8b5bb339041f0e4bf2"]
> }
> ```
</details>

