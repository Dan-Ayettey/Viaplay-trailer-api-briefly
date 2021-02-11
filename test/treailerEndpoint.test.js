/*
 during test the enviroment is set the test
 */
process.env.NODE_ENV='test';
require('jest');
const server=require('../bin/www')
const superTest=require('supertest')
const  tester=superTest(server)
const request=require('request')
/*
  Simple test
  Using GET method to test trailers endpoint
 */


describe('/GET trailers and version',function () {
it('It should get all the trailers',async function (done) {

  await request.get('http://localhost:3000/v1/trailers?url=http://content.viaplay.se/pc-se/film').
  on('response', function(response) {
       expect(response.statusCode).toBe(200) //expect 200
      done()
  })
})
    /*
  Simple test
  Using GET method to test version endpoint
 */
    it('It should get version',async function (done) {

        await request.get('http://localhost:3000/v1/').
        on('response', function(response) {
            expect(response.statusCode).toBe(200) //expect 200
            done()
        })

        done()
    })

})


