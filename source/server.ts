import http from 'http';
import express, {Express} from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

const router: Express = express();

// Logging
router.use(morgan('dev'));

// Parse the request
router.use(express.urlencoded({ extended: false}));

// Taking care of Json data 
router.use(express.json());

// Rules of the APIs
router.use((req, res, next) =>{
    // set CORs Policy
    res.header('Access-Control-Allow-Origin', '*');
    
    // set CORs Headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');

    // set CORs method headers
    if (req.method == 'OPTION'){
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE, POST');
        return res.status(200).json({});
    }
    next();
});

// Routes
router.use('/', routes);

// Error Handling
router.use((req, res, next) =>{
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

// Server
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`)
});