const fetch =require('node-fetch')
/*
 @fetchAll(any)
 For performance reasons, Using  Promise to iterate promises and
  returns a single Promise that resolves to an array of the results of the input promises.
 */

const fetchAll=async(arrayOfUrls)=> {
    return  await Promise.all(arrayOfUrls);
}


/*
 @fetchOne(any)
 Using fetch api for network requests Promise that result and
 manipulating parts of the HTTP pipeline

 */
const fetchOne=async (url)=>await fetch(url);
module.exports={
    fetchOne,
    fetchAll
}
