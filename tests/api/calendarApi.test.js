import calendarApi from "../../src/api/calendarApi";

describe("Pruebas en calendarApi", () => {
  const token = "jorge";
  localStorage.setItem("token", token);

  test("01 debe tener la configuración por defecto", () => {
    // console.log(process.env.VITE_API_URL);
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("02 debe tener x-token en header de todas las peticiones", async () => {
    try {
      const res = await calendarApi
        .get("/auth")
        .then((res) => console.log("res de then", res))
        .catch((err) => {
          //   console.log("error de catch");
          //   console.log(err.config.headers["x-token"]);

          expect(err.config.headers["x-token"]).toBe(token);
        });

      //   console.log(res);
    } catch (error) {
      console.log("error del catch 2");
      console.log(error.request);
    }
  });
});
