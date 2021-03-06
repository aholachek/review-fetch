import { get, post } from "./index"

describe("get method", () => {
  it("should make a GET request to the provided endpoint and return an object with parsed json in the 'data' key ", async () => {
    const result = await get("/api")
    expect(result).to.eql({
      data: {
        good_job: "GET request works!"
      }
    })
  })

  it("should specify that it always wants the response in JSON form ", async () => {
    const result = await get("/api/response-format")
    expect(result).to.eql({
      data: {
        good_job: "you correctly specified that you want json as a response"
      }
    })
  })

  it("When response.ok is false, (error code returned by the server >=300), should return an object with an error key with some details about the error", async () => {
    const result = await get("/api/error")
    expect(result).to.eql({
      error: {
        // this string, "http", is hardcoded by you to indicate that the request
        // generated a server response
        // (the next test is catching responses that do not manage to get a response from the network)
        type: "http",
        status: 500,
        body: {
          error: "This endpoint always triggers a 500 error"
        }
      }
    })
  })

  it("should catch any network errors and return an error object with the error message in the 'type' field", async () => {
    const result = await get("/api/timeout/one")
    expect(result).to.eql({
      error: {
        // in Firefox, this will be "NetworkError when attempting to fetch resource." instead
        type: "Failed to fetch"
      }
    })
  })

  // helpful stack overflow link: https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
  it("should, if provided a query key in an options object, submit that data as a url-encoded query string", async () => {
    const result = await get("/api", {
      query: {
        search_term: "ice cream",
        page: 2
      }
    })
    expect(result).to.eql({
      data: {
        good_job:
          "You successfully submitted a request for data about ice cream",
        page: 2
      }
    })
  })
})

describe("post method", () => {
  it("should make a post request to the provided endpoint and return an object with parsed json in the 'data' key ", async () => {
    const result = await post("/api")
    expect(result).to.eql({
      data: {
        good_job: "POST request works!"
      }
    })
  })

  it('should accept a "json" object in the options argument, and submit that data as json to the server', async () => {
    const result = await post("/api/snack/json", {
      json: {
        user: "jorge",
        favorite_snack: "ice cream"
      }
    })
    expect(result).to.eql({
      data: {
        good_job: "jorge's favorite snack has been recorded as ice cream"
      }
    })
  })
  // possibly helpful links:
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
  // https://stackoverflow.com/questions/42980645/easier-way-to-transform-formdata-into-query-string
  it('should accept a "form" key in the options argument, and submit that form data to the server', async () => {
    const result = await post("/api/snack/form", {
      form: document.querySelector("#test-form")
    })
    expect(result).to.eql({
      data: {
        good_job: "jorge's favorite snack has been recorded as cheetos"
      }
    })
  })

  it('should take a "retries" param and retry a failed request x number of times', async () => {
    const result = await post("/api/timeout/two", { retries: 2 })
    expect(result).to.eql({
      data: { success: "third time's the charm" }
    })
  })
})
