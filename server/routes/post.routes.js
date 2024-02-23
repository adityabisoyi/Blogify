const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const { createPost, getAllPosts, getSinglePost, editPost, deletePost, getCategoryPosts, getUserPosts } = require('../controllers/post.controller')
const multer = require('multer')


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


const router = express.Router()

router.get('/', getAllPosts)
router.get('/:id', getSinglePost)
router.get('/users/:id', getUserPosts)
router.get('/categories/:category', getCategoryPosts)
router.post('/', authMiddleware, upload.single('thumbnail'), createPost)
router.patch('/:id', authMiddleware, editPost)
router.delete('/:id', authMiddleware, deletePost)



module.exports = router