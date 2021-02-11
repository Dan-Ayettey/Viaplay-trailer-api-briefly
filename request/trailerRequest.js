const dotenv=require('dotenv')
const fetch =require('node-fetch')
const bunyan = require('bunyan');
/*
 Using Bunyan is a simple and fast JSON logging library for quick performance
 */
const log = bunyan.createLogger({name: "Sample brief api"});
/*
 @dotenv.config()
 Using Dotenv is a zero-dependency module that loads environment variables from a .env
 */
dotenv.config();


/*
 @fetchAll(any)
 For performance reasons, Using  Promise to iterate promises and
  returns a single Promise that resolves to an array of the results of the input promises.
 */

const fetchAll=async(arrayOfUrls)=> {
    return  await Promise.all(arrayOfUrls);
}
/*
 @trailerRequest(any)
 Using fetch api for network requests Promise that result and
 manipulating parts of the HTTP pipeline

 */
const trailerRequest=async (url)=>await fetch(url);
 const viaPlayEmbeddedBlock=async (url)=> {
    /*
     Request data  from viapaly endpoint and filter for product block for imdb data using non blocking trailerRequest
     and in turn return chunks of data. Using lamda expression
    */
     return await trailerRequest(url).then((response => response.json())).
     then((response)=>response._embedded['viaplay:blocks'].filter((page)=>page.pageCount !==undefined)
                .map(productIMDB=>productIMDB._embedded['viaplay:products'].map(content=> content.content.imdb)).
         map(imdbDetails=>imdbDetails)[0].map(imdb=> imdb )).
     then((imdbDetails)=>imdbDetails.filter(details=>details !==undefined).
     map( data=> JSON.parse(JSON.stringify(data))).map(imdb=>imdb.id))


}
const trailerUrls=async (iMDBData)=>{
    /*   iterate through imdb_id data and find movies key to use for fetching data on themoviesdb api_key is needed,
       the .env file in the root directory should be use.
       trailerRequest data  from themoviedb endpoint and filter for chunk of trailer id block for url data using non blocking trailerRequest
       and in turn return chunks of data
      */
    const results = await fetchAll(iMDBData.map(async (find) =>
        await trailerRequest(`https://api.themoviedb.org/3/find/${find}?api_key=${process.env.API_KEY}&language=en-US&external_source=imdb_id`)
            .then((response) => response.json())));
             const movieDetails=results.map((details)=>JSON.parse(JSON.stringify(details,null,2)).movie_results
            .map((trailerId)=>trailerId.id));

            return await fetchAll(movieDetails.
            map(async (id)=>await trailerRequest(`https://api.themoviedb.org/3/movie/${id[0]}/videos?api_key=${process.env.API_KEY}&language=en-US`)
            .then((response=>response.json())).
            then((results)=>'https://www.youtube.com/watch?v='+JSON.parse(JSON.stringify(results)).results[0].key))).catch((reason => log.info(reason)));

}

//export modules
module.exports={
     viaPlayEmbeddedBlock,
     trailerUrls
}
