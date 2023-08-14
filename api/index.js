const {express, routes} = require('./controller')
const app = express()

app.use(
    express.urlencoded({
        extended: false
    }),
    routes
)