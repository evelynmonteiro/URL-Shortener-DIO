# URL Shortener DIO

This design challenge was developed within the Digital Innovation One platform and is a URL shortener.

### Endpoints

- /shorten
- /:hash

The **/shorten** endpoint expects to receive a post with a json that contains the URL to be shortened, like the example below

```JSON
{
	"originURL" : "https://conteudo.imguol.com.br/c/entretenimento/d0/2019/02/01/ilustracao-de-juan-pablo-machado-que-esta-no-canal-chilled-cow-1549031091954_v2_450x337.jpg"
}
```
