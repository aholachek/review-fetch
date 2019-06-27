import * as fetchMethods from "./index"
describe("fetch", () => {
  describe("get  method", () => {
    it("should make a get request to the provided endpoint and return an object with parsed json in the 'data' key ", async () => {
      const result = await fetchMethods.get("/api")
      expect(result).to.eql({
        data: {
          good_job: "GET request works!"
        }
      })
    })

    it("When response.ok is false, (error code returned by the server >=300), should return an object with an error key with some details about the error", async () => {
      const result = await fetchMethods.get("/api/error")
      expect(result).to.eql({
        error: {
          type: "http",
          status: 500,
          body: {
            error: "This endpoint always triggers a 500 error"
          }
        }
      })
    })

    it("should catch any network errors and return an error object with the error message in the 'type' field", async () => {
      const result = await fetchMethods.get("http://fake.com/api/network-error")
      expect(result).to.eql({
        error: {
          type: "Failed to fetch"
        }
      })
    })
    it("should, if provided a query key in an options object, submit that data as a url-encoded query string", async () => {
      const result = await fetchMethods.get("/api", {
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
      const result = await fetchMethods.post("/api")
      expect(result).to.eql({
        data: {
          good_job: "POST request works!"
        }
      })
    })

    it('should accept a "json" object in the options argument, and submit that data as json', async () => {
      const result = await fetchMethods.post("/api/snack/json", {
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

    it('should accept a "form" in the options argument, and submit the data in that form', async () => {
      const result = await fetchMethods.post("/api/snack/form", {
        form: document.querySelector("#test-form")
      })
      expect(result).to.eql({
        data: {
          good_job: "jorge's favorite snack has been recorded as cheetos"
        }
      })
    })
  })
})