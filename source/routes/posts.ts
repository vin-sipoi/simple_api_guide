// Connecting files to their controllers 

import express from 'express';
import controller from '../controllers/post';

const router = express.Router();

router.get('/posts', controller.getPosts);
router.get('/posts/:id', controller.getPost);
router.put('/posts/:id', controller.updatePost);
router.delete('/post/id:', controller.deletePost);
router.post('/posts', controller.addPost);

export = router;

// Necessary routers to handle the respective API endpoints. (GET, POST, PATCH, and DELETE)