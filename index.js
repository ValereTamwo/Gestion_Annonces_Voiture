const app = require("./app");
const port = 3000

app.listen(port, (err) => {
    if (err) {
        console.log("An error occured")
    } else {
        console.log("Server is running on port "+port)
    }
})