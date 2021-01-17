# Stock market application - Backend

## Libraries Used

-   Node 10 - [What is Node?](https://nodejs.org/docs/latest/api/documentation.html)
-   Express - [Why Express JS?](https://expressjs.com/en/4x/api.html)
-   Cors - [What is Cors?](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Installation

You can clone the repository from : (https://github.com/SridharanManoharan/stock-market-cwa)

Make sure you have node and npm (node package manager) installed. Then on your terminal, navigate to the root folder of the project and run.

```bash
npm install
```

## To Run the project

```bash
npm run start
```

#### Local
##### API Specifications

## To get all stock related data
| URL - GET                                                      |
| -------------------------------------------------------------- |
| http://localhost:9000//customer-api/browser/stock              |

## Response
{
    "stockMarketData": [   
        {
            "stockSymbol": TEA | POP | ALE | GIN | JOE,
            "type": Common | Preffered,
            "lastDividend": Number,
            "fixedDividend": Number,
            "parValue": Number
        },
        ...]
}

## To get calcutated divident yeild
| URL - POST                                                     |
| -------------------------------------------------------------- |
| http://localhost:9000//customer-api/browser/stock/yeild        |

## Request body
{
    "stockSymbol": TEA | POP | ALE | GIN | JOE,
    "stockPrice": Number,
}
## Response
{
    "stockSymbol": TEA | POP | ALE | GIN | JOE,
    "stockPrice": Number,
    "value": Number
}

## To get calcutated pe - ratio
| URL - POST                                                     |
| -------------------------------------------------------------- |
| http://localhost:9000//customer-api/browser/stock/peratio      |

## Request body
{
    "stockSymbol": TEA | POP | ALE | GIN | JOE,
    "stockPrice": Number,
}
## Response
{
    "stockSymbol": TEA | POP | ALE | GIN | JOE,
    "stockPrice": Number,
    "value": Number
}

## To get volume weighted price
| URL - POST                                                     |
| -------------------------------------------------------------- |
| http://localhost:9000//customer-api/browser/stock/vwprice      |

## Request body
{
    "stockSymbol": TEA | POP | ALE | GIN | JOE
}

## Response
{
    "stockSymbol": TEA | POP | ALE | GIN | JOE,
    "vwprice": Number
}

## To get volume weighted price
| URL - GET                                                      |
| -------------------------------------------------------------- |
| http://localhost:9000//customer-api/browser/stock/gbce      |

## Response
{
    "gbce": Number
}